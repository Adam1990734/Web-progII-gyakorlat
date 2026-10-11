const router = require("express").Router();
const controller = require("../controllers/messageContorller");

router.get("/", controller.messageIndexGet);

module.exports = router;