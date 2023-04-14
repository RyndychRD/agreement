const NotificationIsReadService = require("../../service/notification/notification-is-read-service");
const { SocketService } = require("../../service/socket/socket-service");

class DocumentsSocketController {
  static readNotification(user, msg) {
    NotificationIsReadService.readNotifications(user.id, msg).then(() => {
      SocketService.sendSocketMsgByUserId(user.id, {
        ...msg,
        type: "successReadNotification",
      });
    });
  }

  static sendAllNotifications(user, ws) {
    NotificationIsReadService.getNotificationCount(user.id).then(
      (notifications) => {
        ws.send(JSON.stringify({ type: "setNotifications", notifications }));
      }
    );
  }
}

module.exports = DocumentsSocketController;
