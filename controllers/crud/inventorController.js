const Inventor = require("../../models/inventor/Inventor");
const inventorRequestDto = require("../../models/inventor/InventorRequestDto");
const inventorResponseDto = require("../../models/inventor/InventorResponseDto");
const inventorShortDto = require("../../models/inventor/inventorShortDto");
const inventorService = require("../../service/inventorService");

const express = require("express");

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

    const inventors = await inventorservice.findAll(page, len);

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
    const inventor = await inventorservice.findById(id);

    res.render("inventor/details", {
        "inventor": inventor
    });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventorCreateGet = async (req, res) => res.render("inventor/create", {
    "isUpdate": false
});

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
     * @type {inventorRequestDto}
     */
    const dto = req.dto;
    await inventorservice.create(dto);

    res.redirect("/crud/inventors");
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
        "isUpdate": true,
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
     * @type {inventorRequestDto}
     */
    const dto = req.dto;
    const invention = await inventorservice.update(id, dto);

    res.redirect("/crud/inventors");
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
    await inventorservice.delete(id);

    res.redirect("/crud/inventors");
};