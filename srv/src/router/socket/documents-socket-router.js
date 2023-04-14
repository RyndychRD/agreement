const NotificationIsReadService = require("../../service/notification/notification-is-read-service");
const { SocketService } = require("../../service/socket/socket-service");

const DocumentsSocketRouter = (ws, user) => {
  // При первом подключении отсылаем всю инфу по нотификации
  if (user) {
    NotificationIsReadService.getNotificationCount(user.id).then(
      (notifications) => {
        ws.send(JSON.stringify({ type: "setNotifications", notifications }));
      }
    );
  }
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg?.type) {
      case "readNotification":
        NotificationIsReadService.readNotifications(user.id, msg).then(() => {
          SocketService.sendSocketMsgByUserId(user.id, {
            ...msg,
            type: "successReadNotification",
          });
        });
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
