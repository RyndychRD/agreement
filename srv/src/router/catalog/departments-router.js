const Router = require("express").Router;
const router = new Router();
const departmentController = require("../../controllers/catalogControllers/department-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),departmentController.getDepartments);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),departmentController.createNewDepartment);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(),departmentController.updateDepartment);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),departmentController.deleteDepartment);

module.exports = router;
