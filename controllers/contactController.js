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
exports.contactIndexGET = (req, res) => res.render("message/create");

/**
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.contactCreateMessagePOST = async (req, res) => {
    const messageservice = new messageService();
    await messageservice.create(
        req.session.user === undefined || req.session.user === null ?
            null : req.session.user,
        new messageDto(
            req.body.content,
            req.body.createdAt
        )
    );
    res.redirect("/contact");
};