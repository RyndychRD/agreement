const Router = require("express").Router;
const router = new Router();
const authMiddleware = require("../../../middlewares/auth-middleware");
const rightMiddleware = require("../../../middlewares/right-middleware");
const DocumentTypeViewsController = require("../../../controllers/constructorControllers/form/document-type-views-controller");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),DocumentTypeViewsController.getTypeView);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),DocumentTypeViewsController.createTypeView);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),DocumentTypeViewsController.deleteTypeView);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), DocumentTypeViewsController.updateTypeView);

module.exports = router;
