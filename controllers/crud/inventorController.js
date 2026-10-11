const Inventor = require("../../models/inventor/Inventor");
const inventorDto = require("../../models/inventor/InventorDto");
const inventorRespDto = require("../../models/inventor/InventorResponseDto");
const inventorShortDto = require("../../models/inventor/inventorShortDto");
const inventorService = require("../../service/inventorService");

const express = require("express");

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
 */
exports.inventorIndexGet = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;

    const page = req.query.page == undefined || isNaN(Number(req.query.page)) ? 0 : Number(req.query.page);
    const len = req.query.len == undefined || isNaN(Number(req.query.page)) ? 25 : Number(req.query.len);

    const inventors = inventorservice.findAll();

    res.render("inventor/index", {
        inventors: inventors,
        //Pager elmehez konvenció rész:
        lastpage: page,
        len: len,
        allcount: await Inventor.countDocuments(),
        datalen: inventors.length
    });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorDetailsGet = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorCreateGet = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorCreatePost = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorUpdateGet = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorUpdatePost = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorDeleteGet = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorDeletePost = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;

};