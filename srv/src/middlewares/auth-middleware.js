const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

/**
 * Обработка авторизации
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns ApiError
 */

const authFunction = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      //Пользователь не авторизован
      ApiError.UnauthorizedError();
      return res.status(401).end();
    }

    //Парсим Bearer токен
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      ApiError.UnauthorizedError();
      return res.status(401).end();
    }

    //Проверяем на корректность данных
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      ApiError.UnauthorizedError();
      return res.status(401).end();
    }

    req.user = userData;
    next();
  } catch (e) {
    ApiError.UnauthorizedError();
    //Пользователь не авторизован
    return res.status(401).end();
  }
};

module.exports = authFunction;
