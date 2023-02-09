const Router = require("express").Router;
const router = new Router();
const DocumentNotificationController = require("../../controllers/notification/notification-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

// prettier-ignore
router.get("/",authMiddleware,DocumentNotificationController.getNotificationCount);
// prettier-ignore
router.put("/read-notifications",authMiddleware,DocumentNotificationController.readNotifications);

module.exports = router;
