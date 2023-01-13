const Router = require("express").Router;
const router = new Router();
const userController = require("../../controllers/catalogControllers/user-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),userController.getUsers);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),userController.createNewUser);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),userController.deleteUser);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), userController.updateUser);

module.exports = router;
