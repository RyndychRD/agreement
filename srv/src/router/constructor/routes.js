const Router = require("express").Router;
const router = new Router();
const routeController = require("../../controllers/constructorControllers/route-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),routeController.getRoutes);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),routeController.createNewRoute);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),routeController.deleteRoute);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), routeController.updateRoute);

module.exports = router;
