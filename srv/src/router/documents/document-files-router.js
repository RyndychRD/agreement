const Router = require("express").Router;
const router = new Router();
const documentFilesController = require("../../controllers/documentControllers/document-files-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

// prettier-ignore
router.get("/",authMiddleware,documentFilesController.getDocumentFiles);
router.post("/", authMiddleware, documentFilesController.addDocumentFiles);

module.exports = router;
