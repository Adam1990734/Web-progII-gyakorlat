const router = require("express").Router();
const controller = require("../../controllers/crud/inventionController");

router.get(
    "/",
    controller.inventionServiceInejction,
    controller.inventionIndexGet
);
router.get(
    "/details",
    controller.inventionServiceInejction,
    controller.inventionDetailsGet
);

router.get(
    "/create",
    controller.inventionCreateGet
);

router.post(
    "/create",
    controller.inventionServiceInejction,
    controller.inventionDtoInejctionPost,
    controller.inventionCreatePost
);

router.get(
    "/update/{id}",
    controller.inventionServiceInejction,
    controller.inventionUpdateGet
);

router.post(
    "/update/{id}",
    controller.inventionServiceInejction,
    controller.inventionDtoInejctionPost,
    controller.inventionUpdatePost
);

router.get(
    "/delete",
    controller.inventionServiceInejction,
    controller.inventionDeleteGet
);

router.post(
    "/delete",
    controller.inventionServiceInejction,
    controller.inventionDeletePost
);

module.exports = router;