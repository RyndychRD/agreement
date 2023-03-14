const Router = require("express").Router;
const router = new Router();
const authMiddleware = require("../../middlewares/auth-middleware");
const archiveLogController = require("../../controllers/logControllers/archive-log-controller");

// prettier-ignore
router.post("/archive-log",authMiddleware, archiveLogController.addArchiveLog);

module.exports = router;
