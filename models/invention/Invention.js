const mongoose = require("mongoose");
const inventionSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlenght: 80
    },
    inventors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventor"
    }]
});
module.exports = mongoose.model("Invention", inventionSchema);