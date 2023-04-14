const DocumentsSocketController = require("../../controllers/socketControllers/document-socket-controller");

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
