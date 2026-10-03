const fs = require("fs");
const path = require("path");
const readline = require("readline");
const Invention = require("./../../models/invention/Invention");

class inventionSeederData {
    _inventionContainer = new Map();
}

class inventionSeeder extends inventionSeederData {
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
            const invention = await Invention.create({
                name: splitted[1],
                inventors: []
            });
            this._inventionContainer[Number(splitted[0])] = invention;
        }
    }
    async down() { await Invention.deleteMany(); }
    get getInventions() { return this._inventionContainer; }
}
module.exports = inventionSeeder;