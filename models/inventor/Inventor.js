const mongoose = require("mongoose");
const inventorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name field is required!"],
        maxlenght: [40, "The maximum name lenght is 40 characters!"]
    },
    bornAt: {
        type: Number,
        required: [true, "The born date field is required!"],
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