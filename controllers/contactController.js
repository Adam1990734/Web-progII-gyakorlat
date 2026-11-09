const User = require("../models/user/User");
const Message = require("../models/message/Message");//POCO
const messageRequestDto = require("../models/message/messageRequestDto");//Fogadott
const messageResponseDto = require("../models/message/messageResponseDto");//Küldendő
const messageService = require("../services/messageService");//Kezelő

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
    /**
     * @type {messageService}
     */
    const messageservice = req.messageService;

    const user = req.session.user === undefined ? 
        null : 
        await User.findById(req.session.user.id);

    /**
     * @type {messageRequestDto}
     */
    const dto = req.dto;

    await messageservice.create(
        user,
        dto
    );
    res.redirect("/contact");
};