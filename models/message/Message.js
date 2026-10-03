const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        maxlength: [500, "The maximum content is 500 characters!"],
        required: [true, "There is no message without content!"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: [true, "There is no message without a created time"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
module.exports = mongoose.model("Message", messageSchema);