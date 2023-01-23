const Router = require("express").Router;
const router = new Router();
const authMiddleware = require("../../../middlewares/auth-middleware");
const rightMiddleware = require("../../../middlewares/right-middleware");
const DocumentTypeViewsController = require("../../../controllers/constructorControllers/form/document-type-views-controller");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),DocumentTypeViewsController.getTypeView);

module.exports = router;
