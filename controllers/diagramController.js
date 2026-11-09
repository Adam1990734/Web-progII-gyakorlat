const timelineDto = require("../models/diagram/TimelineDto");
const withCountDto = require("../models/diagram/WithCountDto");
const diagramService = require("../service/diagramService");

const express = require("express");

/**
 * 
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.withCountAPIGet = async (req, res) => {
    /**
     * @type {diagramService}
     */
    const diagramService = req.diagramService;

    res.status(200)
       .json(await diagramService.getAllWithCount(100));
};

/**
 * 
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.withCountGet = async (req, res) => 
    res.render( "diagram/withCount", {
        dataURL: "/api/diagrams/withcount"
    });

/**
 * 
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.timelineAPIGet = async (req, res) => {
    /**
     * @type {diagramService}
     */
    const diagramService = req.diagramService;

    res.status(200)
       .json(await diagramService.getAllTimeline(100));
};

/**
 * 
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.timelineGet = async (req, res) =>
    res.render("diagram/timeline", {
        dataURL: "/api/diagrams/timeline"
    });