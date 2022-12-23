const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const departmentController = require("../controllers/catalogControllers/department-controller");
const positionController = require("../controllers/catalogControllers/position-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

/**
 * Справочники
 */
//Департаменты
// prettier-ignore
router.get("/departments",authMiddleware,departmentController.getDepartments)
// prettier-ignore
router.post("/departments",authMiddleware,departmentController.createNewDepartment)
// prettier-ignore
router.put("/departments",authMiddleware,departmentController.updateDepartment)
// prettier-ignore
router.delete("/departments",authMiddleware,departmentController.deleteDepartment)

//Должности
// prettier-ignore
router.get("/positions",authMiddleware,positionController.getPositions)
// prettier-ignore
router.post("/positions",authMiddleware,positionController.createNewPosition)
// // prettier-ignore
router.delete("/positions", authMiddleware, positionController.deletePosition);
// // prettier-ignore
router.put("/positions", authMiddleware, positionController.updatePosition);

module.exports = router;
