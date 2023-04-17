const Router = require("express").Router;
const router = new Router();
const DocumentFileController = require("../controllers/file-controller");
const fileAuthMiddleware = require("../middlewares/file-auth-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const rightMiddleware = require("../middlewares/right-middleware");

// prettier-ignore
router.post("/",fileAuthMiddleware,rightMiddleware(), DocumentFileController.uploadFile);
router.get("/", authMiddleware, DocumentFileController.getFile);

module.exports = router;
