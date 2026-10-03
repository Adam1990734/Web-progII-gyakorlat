const mongoose = require("mongoose");
const inventionSchema = new mongoose.Schema({
    talnev: {
        alias: "name",
        type: String,
        maxlenght: 80
    }
});
module.exports = mongoose.model("Invention", userRoleSchema);