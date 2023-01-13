const Router = require("express").Router;
const router = new Router();
const LoginController = require("../controllers/login-controller");

const { body } = require("express-validator");
//Авторизация пользователя
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  LoginController.registration
);
router.post("/login", LoginController.login);
router.post("/logout", LoginController.logout);
router.get("/activate/:link", LoginController.activate);
router.get("/refresh", LoginController.refresh);

module.exports = router;
