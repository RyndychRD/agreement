const NotificationIsReadService = require("../../service/notification/notification-is-read-service");

const NotificationSocketRouter = (ws, user) => {
  // При первом подключении отсылаем всю инфу по нотификации
  NotificationIsReadService.getNotificationCount(user.id).then(
    (notifications) => {
      ws.send(JSON.stringify(notifications));
    }
  );
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg?.type) {
      //   case "getNotifications":
      //     // SocketController.getNotificationCount();
      //     ws.send(JSON.stringify({ ...msg, userId: user.id }));
      //     break;
      default:
        console.log(
          "Не известный тип вызываемой функции в NotificationSocketRouter, рассматриваемое сообщение: ",
          msg
        );
    }
  });
};

module.exports = { NotificationSocketRouter };
