const router = require("express").Router();
const controller = require("../controllers/contactController");

router.get("/", controller.contactIndexGet);
router.post("/", controller.contactCreateMessagePost);

module.exports = router;