const User = require("../models/user/User");
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
    const user = req.session.user === undefined ? null : 
        await User.find({
            username: req.session.user.username
        });
    console.log(req.session.user);
    await messageservice.create(
        user,
        new messageDto(
            req.body.content,
            Date.now()
        )
    );
    res.redirect("/contact");
};