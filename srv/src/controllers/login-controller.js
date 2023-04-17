const loginService = require("../service/login-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  /**
   * Регистрация пользователя
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await loginService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  /**
   * Авторизация
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await loginService.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 12 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Выход из учётной записи
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await loginService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.send("");
    } catch (e) {
      next(e);
    }
  }
  /**
   * Активация аккаунта
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await loginService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  /**
   * Обновление сессии
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await loginService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      res.status(401).end();
    }
  }
}

module.exports = new UserController();
