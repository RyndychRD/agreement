const DocumentsSocketController = require("../../controllers/socketControllers/document-socket-controller");
const NotificationIsReadService = require("../../service/notification/notification-is-read-service");
const { SocketService } = require("../../service/socket/socket-service");

const DocumentsSocketRouter = (ws, user) => {
  // При первом подключении отсылаем всю инфу по нотификации
  if (user) {
    DocumentsSocketController.sendAllNotifications(user, ws);
  }
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg?.type) {
      case "readNotification":
        DocumentsSocketController.readNotification(user, msg);
        break;
      default:
        console.log(
          "Не известный тип вызываемой функции в DocumentsSocketRouter, посылка: ",
          msg
        );
    }
  });
};

module.exports = { DocumentsSocketRouter };
