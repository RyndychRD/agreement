const Router = require("express").Router;
const router = new Router();
const rightController = require("../../controllers/catalogControllers/right-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),rightController.getRights);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),rightController.createNewRight);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),rightController.deleteRight);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), rightController.updateRight);

module.exports = router;
