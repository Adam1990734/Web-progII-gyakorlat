const roleSeeder = require("./seeder/roleSeeder");
const inventorSeeder = require("./seeder/inventorSeeder");
const inventionSeeder = require("./seeder/inventionSeeder");
const { default: mongoose } = require("mongoose");
const env = require("dotenv").config();

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

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    //Role-ok seedelése:
    const roleseed = new roleSeeder();
    await roleseed.down();
    await roleseed.up("roles.txt");
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
}

//Futtatás:
main();