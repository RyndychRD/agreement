const Router = require("express").Router;
const router = new Router();
const DocumentTasksController = require("../../controllers/documentTasksControllers/document-task-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/my-tasks",authMiddleware, rightMiddleware(),DocumentTasksController.getIncomeDocumentTasks);

module.exports = router;
