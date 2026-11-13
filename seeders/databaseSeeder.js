const roleSeeder = require("./seeder/roleSeeder");
const userSeeder = require("./seeder/userSeeder");
const inventorSeeder = require("./seeder/inventorSeeder");
const inventionSeeder = require("./seeder/inventionSeeder");
const { default: mongoose } = require("mongoose");
const env = require("dotenv").config();
require("dns").setServers(['8.8.8.8', '8.8.4.4']);

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const Inventor = require("../models/inventor/Inventor");
const Invention = require("../models/invention/Invention");

//Objektumok:
/*
    [{
        id: Number,
        obj: (amit be kell szúrni)
    }, ...]
*/
async function JoinInventorAndInvention(seedSource = "", inventors = new Map(), inventions = new Map()) {
    const seedPath = path.join(
        process.env.SEED_RESOURCES,
        seedSource
    );
    if(!fs.existsSync(seedPath))
        throw new Error("FileNotFound");

    const stream = fs.createReadStream(seedPath);
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    });
    {
        const it = rl[Symbol.asyncIterator]();
        await it.next();
    }
    for await (const line of rl) {
        const splitted = line.split("\t").map(elem => elem.trim());
        const inventionId = splitted[0];
        const inventorId = splitted[1];
        if (!inventorId || !inventionId)
            continue;
        const inventor = inventors[inventorId];
        inventor.inventions.push(inventions[inventionId]);
        const invention = inventions[inventionId];
        invention.inventors.push(inventors[inventorId]);

        await inventor.save();
        await invention.save();
    }
}

async function JoinUsersAndUserRoles(users = [], roles = new Map()) {
    for await (const u of users) {
        console.log(u);
        const role = roles[u.roleid];
        const user = u.user;
        user.role = role._id;
        role.users.push(user);

        await user.save();
        await role.save();
    }
}

async function main() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        //Role-ok seedelése:
        const roleseed = new roleSeeder();
        await roleseed.down();
        await roleseed.up("roles.txt");
        //User-ek seedelése:
        const userseed = new userSeeder();
        await userseed.down();
        await userseed.up("users.txt");
        //Join users and roles:
        await JoinUsersAndUserRoles(userseed.getUsers, roleseed.getRoles);
        //Inventorok seedelése:
        const inventorseed = new inventorSeeder();
        await inventorseed.down();
        await inventorseed.up("kutato.txt");
        //Inventionok seedelése:
        const inventionseed = new inventionSeeder();
        await inventionseed.down();
        await inventionseed.up("talalmany.txt");
        //Kapcsolás:
        await JoinInventorAndInvention(
            "kapcsol.txt",
            inventorseed.getInventors,
            inventionseed.getInventions
        );
        await connection.disconnect();
    } catch(ex) {
        console.error("Erro while trying to seed the database: " + ex.message);
    }
}

//Futtatás:
main();