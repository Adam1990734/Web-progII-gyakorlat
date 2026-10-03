const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        maxlenght: 20
    },
    password: {
        type: String,
        required: [true, "Every User should have a password!"],
        minlenght: 60,
        maxlenght: 60
    },
    role: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "userRole",
        required: [true, "Every User required to have a specific role!"]
    }
});
//Ne kelljen kézzel hash-elni mindig:
userSchema.pre("save", async function(next) {
    if(!this.isModified("password"))
        return;
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
module.exports = mongoose.model("User", userSchema);