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
        default: res.render("crud/index.ejs", {
            "availableTables": availableTables
        }); break;
    }
};