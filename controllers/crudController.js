const Invention = require("../models/invention/Invention");//POCO
const inventionDto = require("../models/invention/inventionDto");//Fogadott
const inventionResponseDto = require("../models/invention/inventionResponseDto");//Küldendő
const inventionService = require("../service/inventionService");//Kezelő

const Inventor = require("../models/inventor/Inventor");//POCO
const inventorDto = require("../models/inventor/inventorDto");//Fogadott
const inventorResponseDto = require("../models/inventor/inventorResponseDto");//Küldendő
const inventorService = require("../service/inventorService");//Kezelő

const express = require("express");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res
 */
exports.crudIndexGet = async (req, res) => {
    const chosen = req.query.chosen == undefined ? "None" : req.query.chosen;
    const availableTables = [
        "Inventor",
        "Invention"
    ];
    switch(chosen) {
        case "Inventor": res.redirect("/invetors"); break;
        case "Invention": res.redirect("/inventions"); break;
        default: break;
    }
};