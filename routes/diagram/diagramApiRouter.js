const router = require("express").Router();
const controller = require("../../controllers/diagramController");
const serviceProvider = require("../../providers/serviceProvider");

router.get("/withcount", serviceProvider.diagramServiceInejction, controller.withCountAPIGet);
router.get("/timeline", serviceProvider.diagramServiceInejction, controller.timelineAPIGet);

module.exports = router;