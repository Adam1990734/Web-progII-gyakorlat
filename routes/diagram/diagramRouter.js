const router = require("express").Router();
const controller = require("../../controllers/diagramController");

router.get("/withcount", controller.withCountGet);
router.get("/timeline", controller.timelineGet);

module.exports = router;