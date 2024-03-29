const Router = require("express").Router;
const router = new Router();
const documentController = require("../../controllers/documentControllers/document-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

// prettier-ignore
router.get("/",authMiddleware,documentController.getDocuments);
// prettier-ignore
router.post("/",authMiddleware,documentController.createNewDocument);
// prettier-ignore
router.delete("/",authMiddleware,documentController.deleteDocument);
// prettier-ignore
router.put("/",authMiddleware, documentController.updateDocument);
// prettier-ignore
router.post("/set-registration-and-change-status",authMiddleware, documentController.updateDocumentRegistrationAndChangeStatus);
// prettier-ignore
router.post("/set-archive-type",authMiddleware, documentController.setArchiveType);
// prettier-ignore
router.get("/archives",authMiddleware,documentController.getDocumentArchives);

module.exports = router;
