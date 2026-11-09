const router = require("express").Router();
const controller = require("../controllers/userController");
const loginProvider = require("../providers/loginProvider");

router.get("/", controller.homeIndex);
router.get("/register", controller.registerGet);
router.post("/register", controller.registerPost);
router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);
router.get("/logout", controller.logout);

router.get("/user", loginProvider.LoggedInPrivilege, controller.userIndex);
router.get("/admin", loginProvider.AdminPrivilege, controller.adminIndex);

module.exports = router;