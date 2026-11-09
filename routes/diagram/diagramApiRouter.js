const router = require("express").Router();
const controller = require("../../controllers/diagramController");

router.get("/withcount", controller.diagramServiceInejction, controller.withCountAPIGet);
router.get("/timeline", controller.diagramServiceInejction, controller.timelineAPIGet);

module.exports = router;