const Router = require("express").Router;
const router = new Router();
const authMiddleware = require("../../middlewares/auth-middleware");
const archiveLogController = require("../../controllers/logControllers/archive-log-controller");

// prettier-ignore
router.get("/archive-log",authMiddleware, archiveLogController.getArchiveLogs);
router.post("/archive-log", authMiddleware, archiveLogController.addArchiveLog);

module.exports = router;
