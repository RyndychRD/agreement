const { SocketService } = require("../service/socket/socket-service");
const tokenService = require("../service/token-service");

/**
 * Обработка авторизации
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns ApiError
 */

const socketAuthFunction = function (ws, req, next) {
  try {
    const accessToken = req.query.accessToken;
    if (!accessToken) {
      console.log("Не передан токен авторизации для сокета");
      ws.close();
    }

    //Проверяем на корректность данных
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      ws.close();
    }
    // Стандартное поведение на закрытие
    ws.on("close", () => {
      console.log("WebSocket was closed");
      SocketService.deleteSocketConnection(ws);
    });

    // Стандартное поведение на ошибку
    ws.on("error", console.log);

    req.user = userData;
    next();
  } catch (e) {
    console.log("Ошибка распознавания токена", e);
    //Пользователь не авторизован
    return ws.close();
  }
};

module.exports = socketAuthFunction;
