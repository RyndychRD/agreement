const Router = require("express").Router;
const router = new Router();
const authMiddleware = require("../../middlewares/auth-middleware");
const documentStatusesController = require("../../controllers/catalogControllers/document-status-controller");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),documentStatusesController.getStatuses);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),documentStatusesController.createNewStatus);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),documentStatusesController.updateStatus);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), documentStatusesController.deleteStatus);

module.exports = router;
