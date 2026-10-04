const Message = require("../models/message/Message");//POCO
const messageDto = require("../models/message/messageDto");//Fogadott
const messageResponseDto = require("../models/message/messageResponseDto");//Küldendő
const messageService = require("../service/messageService");//Kezelő

import { Request, Response } from "express";
import messageService from "../service/messageService";

/**
 * 
 * @param {Request} req 
 * @param {Response} res
 */
exports.contactIndex = (req, res) => res.render("message/index");

/**
 * @param {Request} req 
 * @param {Response} res
 */
exports.contactCreateMessage = async (req, res) => {
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