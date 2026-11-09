const express = require("express");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.LoggedInPrivilege = (req, res, next) => {
    if(req.session.user) { return next(); }
    res.redirect("/login");
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
exports.AdminPrivilege = (req, res, next) => {
    if(req.session.user && req.session.user.role === "ADMIN") { return next(); }
    res.redirect("/");
};