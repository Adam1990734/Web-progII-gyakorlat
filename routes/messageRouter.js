const router = require("express").Router();
const controller = require("../controllers/messageContorller");
const serviceProvider = require("../providers/serviceProvider");

router.get(
    "/",
    serviceProvider.messageServiceInejction,
    controller.messageIndexGet
);

module.exports = router;