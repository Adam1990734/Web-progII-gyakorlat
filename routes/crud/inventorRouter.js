const router = require("express").Router();
const controller = require("../../controllers/crud/inventorController");

router.get(
    "/",
    controller.inventorServiceInejction,
    controller.inventorIndexGet
);
router.get(
    "/details",
    controller.inventorServiceInejction,
    controller.inventorDetailsGet
);

router.get(
    "/create",
    controller.inventorCreateGet
);

router.post(
    "/create",
    controller.inventorServiceInejction,
    controller.inventorDtoInejctionPost,
    controller.inventorCreatePost
);

router.get(
    "/update/{id}",
    controller.inventorServiceInejction,
    controller.inventorUpdateGet
);

router.post(
    "/update/{id}",
    controller.inventorServiceInejction,
    controller.inventorDtoInejctionPost,
    controller.inventorUpdatePost
);

router.get(
    "/delete",
    controller.inventorServiceInejction,
    controller.inventorDeleteGet
);

router.post(
    "/delete",
    controller.inventorServiceInejction,
    controller.inventorDeletePost
);

module.exports = router;