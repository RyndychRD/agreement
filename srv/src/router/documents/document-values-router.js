const Router = require("express").Router;
const router = new Router();
const DocumentValuesController = require("../../controllers/documentControllers/document-values-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),DocumentValuesController.getDocumentValues);

module.exports = router;
