/**
 * Создание пользовательских ошибок
 */
class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  /**
   * Пользователь не авторизован
   * @returns
   */
  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  /**
   * Пользователь не авторизован
   * @returns
   */
  static ForbiddenError(login, path,rights) {
    return new ApiError(
      403,
      `У пользователя ${login} не хватает хотя бы одного права из пула ${rights} для доступа к ${path}`
    );
  }

  /**
   * Проблема с запросом или телом запроса
   * @param {*} message
   * @param {*} errors
   * @returns
   */
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

module.exports = ApiError;
