const router = require("express").Router();
const controller = require("../controllers/databaseReaderController");

router.get("/inventions", require("../controllers/crud/inventionController").inventionServiceInejction, controller.databaseReaderInventionGet);
router.get("/inventors", require("../controllers/crud/inventorController").inventorServiceInejction, controller.databaseReaderInventorGet);

module.exports = router;