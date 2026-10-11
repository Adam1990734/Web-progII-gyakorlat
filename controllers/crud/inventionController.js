const Invention = require("../../models/invention/Invention");
const inventionDto = require("../../models/invention/InventionDto");
const inventionRespDto = require("../../models/invention/InventionResponseDto");
const inventionShortDto = require("../../models/invention/inventionShortDto");
const inventionService = require("../../service/inventionService");

const express = require("express");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionIndexGet = async (req, res) => {
    const inventionservice = new inventionService();

    const page = req.query.page == undefined || isNaN(Number(req.query.page)) ? 0 : Number(req.query.page);
    const len = req.query.len == undefined || isNaN(Number(req.query.page)) ? 25 : Number(req.query.len);

    const inventions = await inventionservice.findAll();

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
    const inventionservice = new inventionService();
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionCreateGet = async (req, res) => {
    const inventionservice = new inventionService();
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionCreatePost = async (req, res) => {
    const inventionservice = new inventionService();
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionUpdateGet = async (req, res) => {
    const inventionservice = new inventionService();
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionUpdatePost = async (req, res) => {
    const inventionservice = new inventionService();
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionDeleteGet = async (req, res) => {
    const inventionservice = new inventionService();
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.inventionDeletePost = async (req, res) => {
    const inventionservice = new inventionService();
};