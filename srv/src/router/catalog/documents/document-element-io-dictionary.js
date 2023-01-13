const Router = require("express").Router;
const router = new Router();
const authMiddleware = require("../../../middlewares/auth-middleware");
const rightMiddleware = require("../../../middlewares/right-middleware");
const documentElementIODictionaryController = require("../../../controllers/catalogControllers/document-element-IO-dictionary-controller");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),documentElementIODictionaryController.getElement);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),documentElementIODictionaryController.createNewElement);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),documentElementIODictionaryController.deleteElement);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), documentElementIODictionaryController.updateElement);

module.exports = router;
