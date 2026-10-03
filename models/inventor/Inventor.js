const mongoose = require("mongoose");
const inventorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Every Inventor should have a name!"],
        maxlenght: 40
    },
    bornAt: {
        type: Number,
        required: [true, "Every Inventor should have a born date!"],
        max: 2026
    },
    diedAt: {
        type: Number,
        max: 2026
    },
    inventions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invention"
    }]
});
module.exports = mongoose.model("Inventor", inventorSchema);