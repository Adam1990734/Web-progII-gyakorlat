const mongoose = require("mongoose");
const userRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The role name is required!"]
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});
module.exports = mongoose.model("userRole", userRoleSchema);