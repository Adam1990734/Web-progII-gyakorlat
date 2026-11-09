const express = require("express");

const inventionService = require("../services/inventionService");
const inventorService = require("../services/inventorService");
const messageService = require("../services/messageService");
const diagramService = require("../services/diagramService");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.inventionServiceInejction = (req, res, next) => {
    req.inventionService = new inventionService();
    next();
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.inventorServiceInejction = (req, res, next) => {
    req.inventorService = new inventorService();
    next();
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.messageServiceInejction = (req, res, next) => {
    req.messageService = new messageService();
    next();
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.diagramServiceInejction = (req, res, next) => {
    req.diagramService = new diagramService();
    next();
}