const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
	"/registration",
	body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

// // middleware that is specific to this router
// router.use((req, res, next) => {
// 	next();
// });
// router.get("/", (req, res) => {
// 	res.send("HOME PAGE");
// });

// router.use("/auth", auth);

module.exports = router;
