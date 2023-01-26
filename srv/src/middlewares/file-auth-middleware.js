const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

const authFunction = function (req, res, next) {
  try {
    const authorizationHeader = req.query.token;
    if (!authorizationHeader) {
      //Пользователь не авторизован
      return next(ApiError.UnauthorizedError());
    }

    //Парсим Bearer токен
    const accessToken = authorizationHeader;
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    //Проверяем на корректность данных
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    //Пользователь не авторизован
    return next(ApiError.UnauthorizedError());
  }
};

module.exports = authFunction;
