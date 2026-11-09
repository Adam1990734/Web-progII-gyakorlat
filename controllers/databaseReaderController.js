const express = require("express");
const inventorService = require("../service/inventorService");
const inventionService = require("../service/inventionService");
const Inventor = require("../models/inventor/Inventor");
const Invention = require("../models/invention/Invention");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.databaseReaderInventorGet = async (req, res) => {
    /**
     * @type {inventorService}
     */
    const inventorservice = req.inventorService;

    const page = req.query.page == undefined || isNaN(Number(req.query.page)) ? 0 : Number(req.query.page);
    const len = req.query.len == undefined || isNaN(Number(req.query.page)) ? 25 : Number(req.query.len);

    const inventors = await inventorservice.findAll(page, len);

    res.render("databaseReader/inventor", {
        inventors: inventors,
        //Pager elmehez konvenció rész:
        lastpage: page,
        len: len,
        allcount: await Inventor.countDocuments(),
        datalen: inventors.length
    });
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.databaseReaderInventionGet = async (req, res) => {
    /**
     * @type {inventionService}
     */
    const inventionservice = req.inventionService;

    const page = req.query.page == undefined || isNaN(Number(req.query.page)) ? 0 : Number(req.query.page);
    const len = req.query.len == undefined || isNaN(Number(req.query.page)) ? 25 : Number(req.query.len);

    const inventions = await inventionservice.findAll(page, len);

    res.render("databaseReader/invention", {
        inventions: inventions,
        //Pager elmehez konvenció rész:
        lastpage: page,
        len: len,
        allcount: await Invention.countDocuments(),
        datalen: inventions.length
    });
};