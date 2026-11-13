const User = require("../models/user/User");
const Message = require("../models/message/Message");
const messageRequestDto = require("../models/message/messageRequestDto");
const messageResponseDto = require("../models/message/messageResponseDto");

/**
 * 
 * @param {Date} date 
 * @returns 
 */
function formatDate(date) {
    return date.toLocaleString("hu-HU");
}

class messageService {
    /**
     * 
     * @param {Number} page 
     * @param {Number} size 
     * @returns {messageResponseDto[]}
     */
    async findAll(page = -1, size = -1) {
        const messages =
                page > -1 && size > -1 ?
                    await Message.find()
                        .skip(page*size)
                        .limit(size)
                : await Message.find();
        return messages.map(message => this.toRespDto(message));
    }
    /**
     * 
     * @param {Number} page 
     * @param {Number} size 
     * @returns {messageResponseDto[]}
     */
    async findAllOrderByDate(page = -1, size = -1) {
        const messages =
                page > -1 && size > -1 ?
                    await Message.find()
                        .populate("user")
                        .sort({ createdAt: -1 })
                        .skip(page*size)
                        .limit(size)
                : await Message.find().populate("user");
        return messages.map(message => this.toRespDto(message));
    }
    /**
     * @param {User} user 
     * @param {messageRequestDto} message
     * @returns {messageResponseDto}
     */
    async create(user, message) {
        const messageCreated = await Message.create({
            content: message.getContent(),
            createdAt: Date.now(),
            user: user
        });
        if(user) {
            user.messages.push(messageCreated);
            user.save();
        }
        return this.toRespDto(messageCreated);
    }
    /**
     * 
     * @param {String} id 
     */
    async delete(id) {
        await Message.findByIdAndDelete({
            _id: id
        });
    }
    //Ez itt a rendes POCO osztály:
    /**
     * 
     * @param {Message} message 
     * @returns {messageResponseDto}
     */
    toRespDto(message) {
        if(message.user == undefined || message.user == null)
            return new messageResponseDto(
                message._id.toString(),
                message.content,
                formatDate(message.createdAt),
                "",
                "Anonymouse"
            );
        return new messageResponseDto(
            message._id.toString(),
            message.content,
            formatDate(message.createdAt),
            message.user._id.toString(),
            message.user.username
        );
    }
    /**
     * 
     * @param {Message} message
     * @returns {messageResponseDto} 
     */
    toSimpDto(message) {
        return new messageRequestDto(
            message.content,
            message.createdAt
        );
    }
}
module.exports = messageService;