const NotificationIsReadModel = require("../../models/notification/notification-is-read-model");
const DevTools = require("../DevTools");
const { SocketService } = require("../socket/socket-service");

class NotificationIsReadService {
  /**
   * Добавляет нотификацию согласно типу
   * @param {*} elementId
   * @param {*} toId
   * @param  {(ReworkDocument|Signing|IncomeTask)} notificationType
   * @returns
   */
  static async addNotification(elementId, toId, notificationType) {
    const func = NotificationIsReadModel.create({
      element_id: elementId,
      reader_id: toId,
      notification_type: notificationType,
    }).then(() => {
      SocketService.sendSocketMsgByUserId(toId, {
        type: "appendNotification",
        notification: {
          element_id: elementId,
          notification_type: notificationType,
        },
      });
    });
    return await DevTools.addDelay(func);
  }

  static async readNotifications(userId, query) {
    const filter = {
      reader_id: userId,
      element_id: query.elementId,
      notification_type: query.notificationType,
    };
    if (!userId) {
      delete filter.reader_id;
    }
    const func = NotificationIsReadModel.readeNotifications({ filter });
    return await DevTools.addDelay(func);
  }

  static async getNotificationCount(userId) {
    const filter = {
      reader_id: userId,
      is_read: false,
    };
    const func = NotificationIsReadModel.getNotifications({ filter });
    const result = await DevTools.addDelay(func);
    return result;
  }
}

module.exports = NotificationIsReadService;
