const router = require("express").Router();
const controller = require("../controllers/contactController");
const serviceProvider = require("../providers/serviceProvider");
const dtoProvider = require("../providers/dtoProvider");

router.get("/", controller.contactIndexGet);
router.post(
    "/",
    serviceProvider.messageServiceInejction,
    dtoProvider.messageDtoInejctionPost,
    controller.contactCreateMessagePost
);

module.exports = router;