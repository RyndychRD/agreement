const Router = require("express").Router;
const router = new Router();
const typeController = require("../../../controllers/catalogControllers/type-controller");
const authMiddleware = require("../../../middlewares/auth-middleware");
const rightMiddleware = require("../../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),typeController.getTypes);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),typeController.createNewType);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),typeController.deleteType);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), typeController.updateType);

module.exports = router;
