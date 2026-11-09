const mongoose = require("mongoose");
const Inventor = require("../models/inventor/Inventor");
const withCountDto = require("../models/diagram/WithCountDto");
const timelineDto = require("../models/diagram/TimelineDto");

class diagramService {

    /**
     * 
     * @param {Number} size 
     * @returns {withCountDto[]}
     */
    async getAllWithCount(size = -1) {
        const inventors = size > 0 ?
            await Inventor.find()
                    .limit(size)
            : await Inventor.find();
        return inventors.map(inventor => this.toWithCountDto(inventor));
    }

    /**
     * 
     * @param {Number} size 
     * @returns {timelineDto[]}
     */
    async getAllTimeline(size = -1) {
        const inventors = size > 0 ?
            await Inventor.find()
                    .limit(size)
            : await Inventor.find();
        return inventors.map(inventor => this.toTimelineDto(inventor));
    }

    /**
     * @param {Inventor} inventor 
     * @returns {withCountDto}
     */
    toWithCountDto(inventor) {
        return new withCountDto(
            inventor.name,
            inventor.inventions.length
        );
    }

    /**
     * @param {Inventor} inventor
     * @returns {timelineDto}
     */
    toTimelineDto(inventor) {
        return new timelineDto(
            inventor.name,
            inventor.bornAt,
            inventor.diedAt
        );
    }
}

module.exports = diagramService;