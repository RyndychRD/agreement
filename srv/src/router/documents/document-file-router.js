const Router = require("express").Router;
const router = new Router();
const DocumentFileController = require("../../controllers/documentControllers/document-file-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),DocumentFileController.uploadFile);

module.exports = router;
