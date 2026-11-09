const inventionRequestDto = require("../models/invention/InventionResponseDto");
const inventorRequestDto = require("../models/inventor/InventorRequestDto");
const messageRequestDto = require("../models/message/messageRequestDto");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.inventionDtoInejctionPost =(req, res, next) => {
    req.dto = new inventionRequestDto(
        req.body.name,
        req.body.inventors
    );
    next();
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.inventorDtoInejctionPost =(req, res, next) => {
    req.dto = new inventorRequestDto(
        req.body.name,
        req.body.bornAt,
        req.body.diedAt,
        req.body.inventions
    );
    next();
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.messageDtoInejctionPost =(req, res, next) => {
    req.dto = new messageRequestDto(
        req.body.content,
        Date.now()
    );
    next();
};