const Router = require("express").Router;
const router = new Router();
const uploadFile = require("../controllers/file-controller");
const fileAuthMiddleware = require("../middlewares/file-auth-middleware");
const rightMiddleware = require("../middlewares/right-middleware");

// prettier-ignore
router.post("/",fileAuthMiddleware,rightMiddleware(), uploadFile);

module.exports = router;
