const Router = require("express").Router;
const router = new Router();
const documentController = require("../../controllers/catalogControllers/document-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

// prettier-ignore
router.get("/",authMiddleware,documentController.getDocuments);
// prettier-ignore
router.post("/",authMiddleware,documentController.createNewDocument);
// prettier-ignore
router.delete("/",authMiddleware,documentController.deleteDocument);
// prettier-ignore
router.put("/",authMiddleware, documentController.updateDocument);

module.exports = router;
