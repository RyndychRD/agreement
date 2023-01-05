const Router = require("express").Router;
const LoginController = require("../controllers/login-controller");
const departmentController = require("../controllers/catalogControllers/department-controller");
const positionController = require("../controllers/catalogControllers/position-controller");
const userController = require("../controllers/catalogControllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const rightMiddleware = require("../middlewares/right-middleware");
const rightController = require("../controllers/catalogControllers/right-controller");

//Авторизация пользователя
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  LoginController.registration
);
router.post("/login", LoginController.login);
router.post("/logout", LoginController.logout);
router.get("/activate/:link", LoginController.activate);
router.get("/refresh", LoginController.refresh);

/**
 * Справочники
 */
//Департаменты
// prettier-ignore
router.get("/catalog/departments",authMiddleware, rightMiddleware(),departmentController.getDepartments)
// prettier-ignore
router.post("/catalog/departments",authMiddleware, rightMiddleware(),departmentController.createNewDepartment)
// prettier-ignore
router.put("/catalog/departments",authMiddleware, rightMiddleware(),departmentController.updateDepartment)
// prettier-ignore
router.delete("/catalog/departments",authMiddleware, rightMiddleware(),departmentController.deleteDepartment)

//Должности
// prettier-ignore
router.get("/catalog/positions",authMiddleware, rightMiddleware(),positionController.getPositions)
// prettier-ignore
router.post("/catalog/positions",authMiddleware, rightMiddleware(),positionController.createNewPosition)
// prettier-ignore
router.delete("/catalog/positions",authMiddleware, rightMiddleware(),positionController.deletePosition);
// prettier-ignore
router.put("/catalog/positions",authMiddleware, rightMiddleware(), positionController.updatePosition);

//Пользователи
// prettier-ignore
router.get("/catalog/users",authMiddleware, rightMiddleware(),userController.getUsers)
// prettier-ignore
router.post("/catalog/users",authMiddleware, rightMiddleware(),userController.createNewUser)
// prettier-ignore
router.delete("/catalog/users",authMiddleware, rightMiddleware(),userController.deleteUser);
// prettier-ignore
router.put("/catalog/users",authMiddleware, rightMiddleware(), userController.updateUser);

//Права
// prettier-ignore
router.get("/catalog/rights",authMiddleware, rightMiddleware(),rightController.getRights)
// prettier-ignore
router.post("/catalog/rights",authMiddleware, rightMiddleware(),rightController.createNewRight)
// prettier-ignore
router.delete("/catalog/rights",authMiddleware, rightMiddleware(),rightController.deleteRight);
// prettier-ignore
router.put("/catalog/rights",authMiddleware, rightMiddleware(), rightController.updateRight);

module.exports = router;
