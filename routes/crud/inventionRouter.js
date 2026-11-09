const router = require("express").Router();
const controller = require("../../controllers/crud/inventionController");
const serviceProvider = require("../../providers/serviceProvider");
const dtoProvider = require("../../providers/dtoProvider");

router.get(
    "/",
    serviceProvider.inventionServiceInejction,
    controller.inventionIndexGet
);
router.get(
    "/details/:id",
    serviceProvider.inventionServiceInejction,
    controller.inventionDetailsGet
);

router.get(
    "/create",
    controller.inventionCreateGet
);

router.post(
    "/create",
    serviceProvider.inventionServiceInejction,
    dtoProvider.inventionDtoInejctionPost,
    controller.inventionCreatePost
);

router.get(
    "/update/:id",
    serviceProvider.inventionServiceInejction,
    controller.inventionUpdateGet
);

router.post(
    "/update/:id",
    serviceProvider.inventionServiceInejction,
    dtoProvider.inventionDtoInejctionPost,
    controller.inventionUpdatePost
);

router.get(
    "/delete/:id",
    serviceProvider.inventionServiceInejction,
    controller.inventionDeleteGet
);

router.post(
    "/delete/:id",
    serviceProvider.inventionServiceInejction,
    controller.inventionDeletePost
);

router.get(
    "/suggest",
    serviceProvider.inventionServiceInejction,
    controller.inventionSuggester
);

module.exports = router;