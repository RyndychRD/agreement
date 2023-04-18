const Router = require("express").Router;
const router = new Router();
const adminActionsController = require("../../controllers/catalogControllers/admin-actions-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/notify-site-close",authMiddleware, rightMiddleware(),adminActionsController.notifySiteClose);

module.exports = router;
