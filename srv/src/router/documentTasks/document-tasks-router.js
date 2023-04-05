const Router = require("express").Router;
const router = new Router();
const DocumentTasksController = require("../../controllers/documentTasksControllers/document-task-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/my-tasks",authMiddleware, rightMiddleware(),DocumentTasksController.getIncomeDocumentTasks);
// prettier-ignore
router.get("/completed_tasks",authMiddleware, rightMiddleware(),DocumentTasksController.getCompletedDocumentTasks);
// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),DocumentTasksController.getDocumentTasksByDocument);
// prettier-ignore
router.get("/task",authMiddleware, rightMiddleware(),DocumentTasksController.getDocumentTask);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),DocumentTasksController.createDocumentTask);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),DocumentTasksController.deleteDocumentTask);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(),DocumentTasksController.updateDocumentTask);

module.exports = router;
