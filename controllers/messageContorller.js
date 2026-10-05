const Message = require("../models/message/Message");//POCO
const messageDto = require("../models/message/messageDto");//Fogadott
const messageResponseDto = require("../models/message/messageResponseDto");//Küldendő
const messageService = require("../service/messageService");//Kezelő

const express = require("express");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.messageIndex = async (req, res) => {
    const messageservice = new messageService();

    const page = req.query.page == undefined || isNaN(Number(req.query.page)) ? 0 : Number(req.query.page);
    const len = req.query.len == undefined || isNaN(Number(req.query.page)) ? 25 : Number(req.query.len);

    const messages = await messageservice.findAllOrderByDate(page, len);

    res.render("message/show", {
        messages: messages,
        lastpage: page,
        len: len,
        allcount: await Message.countDocuments()
    });
};