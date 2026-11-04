const User = require("../models/user/User");
const Message = require("../models/message/Message");//POCO
const messageRequestDto = require("../models/message/messageRequestDto");//Fogadott
const messageResponseDto = require("../models/message/messageResponseDto");//Küldendő
const messageService = require("../service/messageService");//Kezelő

const express = require("express");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.contactIndexGet = (req, res) => res.render("message/create");

/**
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.contactCreateMessagePost = async (req, res) => {
    const messageservice = new messageService();
    const user = req.session.user === undefined ? null : 
        await User.findById(req.session.user.id);
    await messageservice.create(
        user,
        new messageRequestDto(
            req.body.content,
            Date.now()
        )
    );
    res.redirect("/contact");
};