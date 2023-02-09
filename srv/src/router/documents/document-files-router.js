const Router = require("express").Router;
const router = new Router();
const documentFilesController = require("../../controllers/documentControllers/document-files-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

// prettier-ignore
router.get("/",authMiddleware,documentFilesController.getDocumentFiles);
// prettier-ignore
router.post("/", authMiddleware, documentFilesController.addDocumentFiles);
// prettier-ignore
router.post("/add-file-id-to-document", authMiddleware, documentFilesController.addFileIdToDocument);

module.exports = router;
