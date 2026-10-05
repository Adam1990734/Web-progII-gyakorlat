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
exports.messageIndex = (req, res) => {
    const messageservice = new messageService();
    res.render("message/index");
};