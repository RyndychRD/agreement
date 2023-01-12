const ApiError = require("../exceptions/api-error");

/**
 * Обработка прав пользователя
 * @param {*} requiredRights - Список прав, при наличии хотя бы одного из которых разрешается доступ. Доступ админа дает доступ ко всему всегда
 * @returns ApiError
 */
module.exports = function rightMiddleware(requiredRights = []) {
  return function (req, res, next) {
    try {
      //Добавляем права админа, чтобы всегда иметь доступ ко всему
      requiredRights.push("Admin");
      //Выбираем права пользователя по кодовому имени
      const userRights = req.user.rights.map((el) => el.code_name);
      //Должно быть хотя бы одно пересечение прав пользователя и переданных сюда прав
      const isRightsIntersect =
        requiredRights.filter((right) => userRights.indexOf(right) !== -1)
          .length > 0;
      if (isRightsIntersect) {
        // console.log(
        //   `У пользователя ${req.user.login} есть права для доступа к ${req.route.path}`
        // );
        next();
      } else {
        return next(
          ApiError.ForbiddenError(
            req.user.login,
            req.route.path,
            requiredRights
          )
        );
      }
    } catch (e) {
      console.log(e);
      //Пользователь не авторизован
      return next(ApiError.UnauthorizedError());
    }
  };
};
