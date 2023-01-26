const Router = require("express").Router;
const router = new Router();
const DocumentFileController = require("../../controllers/documentControllers/document-file-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

router.post("/", DocumentFileController.uploadFile);

module.exports = router;
