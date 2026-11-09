const router = require("express").Router();
const controller = require("../controllers/databaseReaderController");
const serviceProvider = require("../providers/serviceProvider");

router.get(
    "/inventions",
    serviceProvider.inventionServiceInejction,
    controller.databaseReaderInventionGet
);
router.get(
    "/inventors",
    serviceProvider.inventorServiceInejction,
    controller.databaseReaderInventorGet
);

module.exports = router;