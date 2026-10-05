const router = require("express").Router();
const controller = require("../controllers/contactController");

router.get("/", controller.contactIndexGET);
router.post("/", controller.contactCreateMessagePOST);

module.exports = router;