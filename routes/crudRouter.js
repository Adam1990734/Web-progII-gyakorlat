const router = require("express").Router();
const controller = require("../controllers/crudController");

router.get(
    "/",
    controller.crudIndexGet
);
module.exports = router;