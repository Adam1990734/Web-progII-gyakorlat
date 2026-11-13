const router = require("express").Router();
const controller = require("../controllers/contactController");
const serviceProvider = require("../providers/serviceProvider");
const dtoProvider = require("../providers/dtoProvider");
const validators = require("../validators/messageValidator");

router.get("/", controller.contactIndexGet);
router.post(
    "/",
    serviceProvider.messageServiceInejction,
    dtoProvider.messageDtoInejctionPost,
    validators.messageValidator,
    controller.contactCreateMessagePost
);

module.exports = router;