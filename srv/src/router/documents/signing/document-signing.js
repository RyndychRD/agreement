const signingController = require("../../../controllers/documentControllers/signing-controller");
const authMiddleware = require("../../../middlewares/auth-middleware");

const Router = require("express").Router;
const router = new Router();

// prettier-ignore
router.get("/route",authMiddleware,signingController.getDocumentRoute);

module.exports = router;
