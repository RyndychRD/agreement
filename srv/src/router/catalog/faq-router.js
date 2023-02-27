const Router = require("express").Router;
const router = new Router();
const FaqController = require("../../controllers/catalogControllers/faq-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

// prettier-ignore
router.get("/",authMiddleware, FaqController.getFAQs);

module.exports = router;
