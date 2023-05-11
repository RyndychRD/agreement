const NotificationIsReadModel = require("../../models/notification/notification-is-read-model");
const DevTools = require("../DevTools");
const { SocketService } = require("../socket/socket-service");

class NotificationIsReadService {
  /**
   * Добавляет нотификацию согласно типу
   * @param {*} elementId
   * @param {*} toId
   * @param  notificationType
   * @returns
   */

  static documentNotificationTypes = [
    "ReworkDocument",
    "Signing",
    "OnRegistration",
    "Approved",
    "Completed",
    "Rejected",
    "SignedOOPZ",
    "ProcessingDocument",
  ];
  static documentTaskNotificationTypes = ["IncomeTask", "CompleteTask"];

  static async addNotification(
    elementId,
    toId,
    notificationType,
    documentId = undefined
  ) {
    const notification = {
      element_id: elementId,
      reader_id: toId,
      notification_type: notificationType,
    };
    // prettier-ignore
    if (NotificationIsReadService.documentNotificationTypes.includes(notificationType)) {
      notification.document_id = elementId;
    }
    // prettier-ignore
    if (NotificationIsReadService.documentTaskNotificationTypes.includes(notificationType)) {
      notification.document_id = documentId;
      notification.document_task_id = elementId;
    }
    const func = NotificationIsReadModel.create(notification).then(() => {
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

  static async readNotifications(userId, query, filterIn = undefined) {
    const filter = filterIn
      ? filterIn
      : {
          reader_id: userId,
          element_id: query.elementId,
          notification_type: query.notificationType,
          is_read: false,
        };
    if (!userId) {
      delete filter?.reader_id;
    }
    const func = NotificationIsReadModel.readNotifications(filter).then(
      (readNotifications) => {
        if (readNotifications && readNotifications.length > 0) {
          readNotifications.forEach((notification) => {
            const msg = {
              notificationType: notification.notification_type,
              elementId: notification.element_id,
            };
            SocketService.sendSocketMsgByUserId(notification.reader_id, {
              ...msg,
              type: "successReadNotification",
            });
          });
        }
      }
    );
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
