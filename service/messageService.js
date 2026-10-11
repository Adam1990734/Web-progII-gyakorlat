const User = require("../models/user/User");
const Message = require("./../models/message/Message");
const messageDto = require("./../models/message/messageDto");
const messageResponseDto = require("./../models/message/messageResponseDto");

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
        return messages.map(message => messageService.toDto(message));
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
        return messages.map(message => messageService.toRespDto(message));
    }
    /**
     * @param {User} user 
     * @param {messageDto} message
     * @returns {messageResponseDto}
     */
    async create(user, message) {
        const messageCreated = await Message.create({
            content: message.getContent,
            createdAt: message.getCreatedAt,
            user: user
        });
        user.messages.push(messageCreated);
        user.save();
        return messageService.toRespDto(messageCreated);
    }
    /**
     * @param {String} id 
     * @param {messageDto} message
     * @returns {messageResponseDto}
     */
    async update(id, message) {
        const messageUpdated = await Message.findByIdAndUpdate(
        { _id: id },
        {
            content: message.getContent,
            createdAt: message.getCreatedAt
        });
        return messageService.toRespDto(messageUpdated);
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
    static toRespDto(message) {
        if(message.user == undefined || message.user == null)
            return new messageResponseDto(
                message._id.toString(),
                message.content,
                message.createdAt,
                "",
                "Anonymouse"
            );
        return new messageResponseDto(
            message._id.toString(),
            message.content,
            message.createdAt,
            message.user._id.toString(),
            message.user.username
        );
    }
    /**
     * 
     * @param {Message} message
     * @returns {messageResponseDto} 
     */
    static toSimpDto(message) {
        return new messageDto(
            message.content,
            message.createdAt
        );
    }
}
module.exports = messageService;