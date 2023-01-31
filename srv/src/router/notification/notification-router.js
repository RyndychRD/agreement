const Router = require("express").Router;
const router = new Router();
const DocumentReadNotificationController = require("../../controllers/notification/notification-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

// prettier-ignore
router.get("/",authMiddleware,DocumentReadNotificationController.getNotificationCount);

module.exports = router;
