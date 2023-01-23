const Router = require("express").Router;
const router = new Router();
const DocumentIoDictionaryElementsController = require("../../../controllers/constructorControllers/form/document-io-dictionary-elements-controller");
const authMiddleware = require("../../../middlewares/auth-middleware");
const rightMiddleware = require("../../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),DocumentIoDictionaryElementsController.getIODictionaryElement);

module.exports = router;
