const Invention = require("../../models/invention/Invention");
const inventionDto = require("../models/invention/InventionDto");
const inventionResponseDto = require("../../models/invention/InventionResponseDto");
const inventionShortDto = require("../models/invention/inventionShortDto");
const inventionService = require("../../service/inventionService");

const express = require("express");

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
exports.inventionDtoInejctionPost = (req, res, next) => {
    req.dto = new inventionDto(
        req.body.name,
        req.body.inventors
    );
    next();
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionIndexGet = async (req, res) => {
    /**
     * @type {inventionService}
     */
    const inventionservice = req.inventionService;

    const page = req.query.page == undefined || isNaN(Number(req.query.page)) ? 0 : Number(req.query.page);
    const len = req.query.len == undefined || isNaN(Number(req.query.page)) ? 25 : Number(req.query.len);

    const inventions = await inventionservice.findAll(page, len);

    res.render("invention/index", {
        inventions: inventions,
        //Pager elmehez konvenció rész:
        lastpage: page,
        len: len,
        allcount: await Invention.countDocuments(),
        datalen: inventions.length
    });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionDetailsGet = async (req, res) => {
    /**
     * @type {inventionService}
     */
    const inventionservice = req.inventionService;
    
    const id = req.params.id;
    const invention = await inventionservice.findById(id);

    res.render("invention/details", {
        "invention": invention
    });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionCreateGet = async (req, res) => res.render("/invention/create");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionCreatePost = async (req, res) => {
    /**
     * @type {inventionService}
     */
    const inventionservice = req.inventionService;

    //Itt kell a middleware ami "beinjektál"
    /**
     * @type {inventionDto}
     */
    const dto = req.dto;
    inventionservice.create(dto);

    res.redirect("/inventions");
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionUpdateGet = async (req, res) => {
    /**
     * @type {inventionService}
     */
    const inventionservice = req.inventionService;

    const id = req.params.id;
    const invention = await inventionservice.findById(id);

    res.render("invention/update", {
        "invention": invention
    });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionUpdatePost = async (req, res) => {
    /**
     * @type {inventionService}
     */
    const inventionservice = req.inventionService;

    const id = req.params.id;
    /**
     * @type {inventionDto}
     */
    const dto = req.dto;
    const newInvention = inventionservice.update(id, dto);

    res.redirect("/inventions");
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionDeleteGet = async (req, res) => {
    /**
     * @type {inventionService}
     */
    const inventionservice = req.inventionService;

    const id = req.params.id;
    const invention = inventionservice.findById(id);

    res.render("invention/delete", {
        "invention": invention
    });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionDeletePost = async (req, res) => {
    /**
     * @type {inventionService}
     */
    const inventionservice = req.inventionService;

    const id = req.params.id;
    inventionservice.delete(id);

    res.redirect("/invention");
};