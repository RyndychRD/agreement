const signingController = require("../../controllers/documentControllers/dociment-signing-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

const Router = require("express").Router;
const router = new Router();

// prettier-ignore
router.get("/get-route",authMiddleware,signingController.getDocumentRoute);
router.put(
  "/sign-current-step",
  authMiddleware,
  signingController.signCurrentDocumentStep
);

module.exports = router;
