const Router = require("express").Router;
const router = new Router();
const positionController = require("../../controllers/catalogControllers/position-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),positionController.getPositions);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),positionController.createNewPosition);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),positionController.deletePosition);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), positionController.updatePosition);

module.exports = router;
