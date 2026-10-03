const fs = require("fs");
const path = require("path");
const readline = require("readline");
const Invention = require("./../../models/invention/Invention");

class inventionSeederData {
    _inventionContainer = [];
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
            const invention = await Invention.create({
                name: splitted[1]
            });
            this._inventionContainer.push(invention);
        }
    }
    async down() { await Invention.deleteMany(); }
    get getInventions() { return this._inventionContainer; }
}