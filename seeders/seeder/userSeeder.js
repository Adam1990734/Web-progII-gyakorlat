const fs = require("fs");
const path = require("path");
const readline = require("readline");
const User = require("../../models/user/User");
const UserRole = require("../../models/user/UserRole");

class userSeederData {
    _userContainer = [];
}

class userSeeder extends userSeederData {
    async up(seedSource = "") {
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
            if(splitted[3] === "")
                continue;
            const defaultRole = await UserRole.findOne({ name: "USER" });
            const user = {
                roleid: Number(splitted[3]),
                user: await User.create({
                    username: splitted[1],
                    password: splitted[2],
                    role: defaultRole._id,
                    messages: []
                })
            };
            this._userContainer.push(user);
        }
    }
    async down() { await User.deleteMany(); }
    get getUsers() { return this._userContainer; }
}
module.exports = userSeeder;