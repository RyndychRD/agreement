const Router = require("express").Router;
const router = new Router();
const ArchiveTypeController = require("../../controllers/catalogControllers/archive-type-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const rightMiddleware = require("../../middlewares/right-middleware");

// prettier-ignore
router.get("/",authMiddleware, rightMiddleware(),ArchiveTypeController.getArchiveTypes);
// prettier-ignore
router.post("/",authMiddleware, rightMiddleware(),ArchiveTypeController.createNewArchiveType);
// prettier-ignore
router.delete("/",authMiddleware, rightMiddleware(),ArchiveTypeController.deleteArchiveType);
// prettier-ignore
router.put("/",authMiddleware, rightMiddleware(), ArchiveTypeController.updateArchiveType);

module.exports = router;
