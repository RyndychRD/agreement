const Router = require("express").Router;
const router = new Router();
const documentTypeViewsController = require("../../../controllers/catalogControllers/document-type-views-controller");
const authMiddleware = require("../../../middlewares/auth-middleware");
const rightMiddleware = require("../../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),documentTypeViewsController.getElement);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),documentTypeViewsController.createNewElement);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),documentTypeViewsController.updateElement);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), documentTypeViewsController.deleteElement);

module.exports = router;
