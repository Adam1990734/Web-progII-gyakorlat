import Inventor from "./../../models/inventor/Inventor";

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const Inventor = require("./../../models/inventor/Inventor");

class inventorSeederData {
    _inventorContainer = [];
}

export default class inventorSeeder extends inventorSeederData {
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
            let inventor = null;
            if(splitted.length > 3)
                inventor = await Inventor.create({
                    name: splitted[1],
                    bornAt: Number(splitted[2]),
                    diedAt: Number(splitted[3])
                });
            else
                inventor = await Inventor.create({
                    name: splitted[1],
                    bornAt: Number(splitted[2])
                });
            if(inventor !== null)
                this._inventorContainer.push(inventor);
        }
    }
    async down() { await Inventor.deleteMany(); }
    get getInventors() { return this._inventorContainer; }
}