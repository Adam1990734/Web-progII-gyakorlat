const fs = require("fs");
const path = require("path");
const readline = require("readline");
const UserRole = require("./../../models/user/userRole");

class inventionSeederData {
    _roleContainer = [];
}

export default class inventionSeeder extends inventionSeederData {
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
        for await (const line of rl) {
            const splitted = line.split("\t").map(elem => elem.trim());
            const userRole = await UserRole.create({
                name: splitted[1]
            });
            this._roleContainer.push(userRole);
        }
    }
    async down() { await UserRole.deleteMany(); }
    get getRoles() { return this._roleContainer; }
}