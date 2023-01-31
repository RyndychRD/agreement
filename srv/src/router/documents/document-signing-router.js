const signingController = require("../../controllers/documentControllers/dociment-signing-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

const Router = require("express").Router;
const router = new Router();

// prettier-ignore
router.get("/get-route",authMiddleware,signingController.getDocumentRoute);
// prettier-ignore
router.put("/sign-current-step",authMiddleware,signingController.signCurrentDocumentStep);
// prettier-ignore
router.put("/unsign-last-step",authMiddleware, signingController.unsignLastDocumentStep);
// prettier-ignore
router.put("/update-route",authMiddleware, signingController.updateDocumentRoute);

module.exports = router;
