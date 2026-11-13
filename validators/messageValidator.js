const express = require("express");
const messageRequestDto = require("../models/message/messageRequestDto");

//Mindegyikné úgy tenkintek rá, hogy request-ben benne van a dto hogy egyszerűbb legyen!

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.messageValidator = async (req, res, next) => {
    /**
     * @type {messageRequestDto}
     */
    const dto = req.dto;
    if(dto.getContent().length == 0) {
        res.render("message/create", {
            error: "The content cannot be empty!"
        });
        return;
    }
    if(dto.getContent().length > 500) {
        res.render("message/create", {
            error: "The content max character size is 500!"
        });
        return;
    }
    next()
}