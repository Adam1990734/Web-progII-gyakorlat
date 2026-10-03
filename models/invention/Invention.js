const mongoose = require("mongoose");
const inventionSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [80, "The maximum invention name is 80 characters!"]
    },
    inventors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventor"
    }]
});
module.exports = mongoose.model("Invention", inventionSchema);