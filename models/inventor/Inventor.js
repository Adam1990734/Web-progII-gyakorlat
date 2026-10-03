const mongoose = require("mongoose");
const inventorSchema = new mongoose.Schema({
    nev: {
        alias: "name",
        type: String,
        required: [true, "Every Inventor should have a name!"],
        maxlenght: 40
    },
    szul: {
        alias: "bornAt",
        type: Number,
        required: [true, "Every Inventor should have a born date!"],
        max: 2026
    },
    meghal: {
        alias: "diedAt",
        type: Number,
        max: 2026
    }
});
module.exports = mongoose.model("Inventor", userRoleSchema);