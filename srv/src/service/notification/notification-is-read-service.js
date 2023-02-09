const NotificationIsReadModel = require("../../models/notification/notification-is-read-model");
const DevTools = require("../DevTools");

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
    });
    return await DevTools.addDelay(func);
  }

  static async readNotifications(userId, query) {
    const filter = {
      reader_id: userId,
      element_id: query.elementId,
      notification_type: query.notificationType,
    };
    const func = NotificationIsReadModel.readeNotifications({ filter });
    return await DevTools.addDelay(func);
  }

  static async getNotificationCount(userId, query) {
    const filter = {
      reader_id: userId,
      is_read: false,
    };
    if (query.isGetNotificationCount === "true") {
      const func = NotificationIsReadModel.getNotificationsCount({
        filter,
      });
      const result = await DevTools.addDelay(func);
      return result;
    } else {
      const func = NotificationIsReadModel.getNotifications({ filter });
      const result = await DevTools.addDelay(func);
      return result;
    }
  }
}

module.exports = NotificationIsReadService;
