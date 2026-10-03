const Message = require("./../models/message/Message");
const messageDto = require("./../models/message/messageDto");
const messageResponseDto = require("./../models/message/messageResponseDto");

const User = require("../models/user/User");

class messageService {
    async findAll(page = -1, size = -1) {
        const messages =
                page > -1 || size > -1 ?
                    await Message.find()
                        .skip((page-1)*size)
                        .limit(size)
                : await Message.find();
        return messages.map(inventor => messageService.toDto(inventor));
    }
    /**
     * 
     * @param {messageDto} message
     */
    async create(user, message) {
        const inventorCreated = await Message.create({
            content: message.getContent,
            createdAt: message.getCreatedAt,
            user: user
        });
        return messageService.toDto(inventorCreated);
    }
    /**
     * 
     * @param {messageDto} message 
     */
    async update(id, message) {
        const inventorUpdated = await Message.findByIdAndUpdate(
        { _id: id },
        {
            content: message.getContent,
            createdAt: message.getCreatedAt
        });
        return messageService.toDto(inventorUpdated);
    }
    async delete(id) {
        await Message.findByIdAndDelete({
            _id: id
        });
    }
    //Ez itt a rendes POCO osztály:
    static toDto(message) {
        return new messageResponseDto(
            message._id,
            message.content,
            message.createdAt,
            message.user._id,
            message.user.username
        );
    }
}
module.exports = messageService;