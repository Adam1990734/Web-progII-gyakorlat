const router = require("express").Router();
const controller = require("../../controllers/crud/inventorController");
const serviceProvider = require("../../providers/serviceProvider");
const dtoProvider = require("../../providers/dtoProvider");

router.get(
    "/",
    serviceProvider.inventorServiceInejction,
    controller.inventorIndexGet
);
router.get(
    "/details/:id",
    serviceProvider.inventorServiceInejction,
    controller.inventorDetailsGet
);

router.get(
    "/create",
    controller.inventorCreateGet
);

router.post(
    "/create",
    serviceProvider.inventorServiceInejction,
    dtoProvider.inventorDtoInejctionPost,
    controller.inventorCreatePost
);

router.get(
    "/update/:id",
    serviceProvider.inventorServiceInejction,
    controller.inventorUpdateGet
);

router.post(
    "/update/:id",
    serviceProvider.inventorServiceInejction,
    dtoProvider.inventorDtoInejctionPost,
    controller.inventorUpdatePost
);

router.get(
    "/delete/:id",
    serviceProvider.inventorServiceInejction,
    controller.inventorDeleteGet
);

router.post(
    "/delete/:id",
    serviceProvider.inventorServiceInejction,
    controller.inventorDeletePost
);

module.exports = router;