const Router = require("express").Router;
const LoginController = require("../controllers/login-controller");
const departmentController = require("../controllers/catalogControllers/department-controller");
const positionController = require("../controllers/catalogControllers/position-controller");
const userController = require("../controllers/catalogControllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
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
router.get("/catalog/departments",authMiddleware,departmentController.getDepartments)
// prettier-ignore
router.post("/catalog/departments",authMiddleware,departmentController.createNewDepartment)
// prettier-ignore
router.put("/catalog/departments",authMiddleware,departmentController.updateDepartment)
// prettier-ignore
router.delete("/catalog/departments",authMiddleware,departmentController.deleteDepartment)

//Должности
// prettier-ignore
router.get("/catalog/positions",authMiddleware,positionController.getPositions)
// prettier-ignore
router.post("/catalog/positions",authMiddleware,positionController.createNewPosition)
// prettier-ignore
router.delete("/catalog/positions",authMiddleware,positionController.deletePosition);
// prettier-ignore
router.put("/catalog/positions",authMiddleware, positionController.updatePosition);

//Пользователи
// prettier-ignore
router.get("/catalog/users",authMiddleware,userController.getUsers)
// prettier-ignore
router.post("/catalog/users",authMiddleware,userController.createNewUser)
// prettier-ignore
router.delete("/catalog/users",authMiddleware,userController.deleteUser);
// prettier-ignore
router.put("/catalog/users",authMiddleware, userController.updateUser);

//Права
// prettier-ignore
router.get("/catalog/rights",authMiddleware,rightController.getRights)
// prettier-ignore
router.post("/catalog/rights",authMiddleware,rightController.createNewRight)
// prettier-ignore
router.delete("/catalog/rights",authMiddleware,rightController.deleteRight);
// prettier-ignore
router.put("/catalog/rights",authMiddleware, rightController.updateRight);

module.exports = router;
