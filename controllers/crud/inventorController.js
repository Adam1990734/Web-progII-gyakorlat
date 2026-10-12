const Inventor = require("../../models/inventor/Inventor");
const inventorDto = require("../../models/inventor/InventorDto");
const inventorResponseDto = require("../../models/inventor/InventorResponseDto");
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
 * @param {express.NextFunction} next 
 */
exports.inventorDtoInejctionPost = (req, res, next) => {
    req.dto = new inventorDto(
        req.body.name,
        req.body.bornAt,
        req.body.diedAt,
        req.body.inventors
    );
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

    const inventors = inventorservice.findAll(page, len);

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

    const id = req.params.id;
    const inventor = inventorservice.findById(id);

    res.render("inventor/details", {
        "inventor": inventor
    });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorCreateGet = async (req, res) => res.render("inventor/create");

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

    //Itt kell a middleware ami "beinjektál"
    /**
     * @type {inventionDto}
     */
    const dto = req.dto;
    inventorservice.create(dto);

    res.redirect("/inventors");
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

    const id = req.params.id;
    const inventor = await inventorservice.findById(id);

    res.render("inventor/update", {
        "inventor": inventor
    });
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

    const id = req.params.id;
    /**
     * @type {inventionDto}
     */
    const dto = req.dto;
    const invention = await inventorservice.update(id, dto);

    res.redirect("/inventors");
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

    const id = req.params.id;
    const inventor = await inventorservice.findById(id);

    res.render("inventor/delete", {
        "inventor": inventor
    });
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

    const id = req.params.id;
    inventorservice.delete(id);

    res.redirect("/inventors");
};