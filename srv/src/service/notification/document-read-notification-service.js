const DocumentIsReadModel = require("../../models/notification/document-is-read-model");
const DevTools = require("../DevTools");

class DocumentReadNotificationService {
  static documentStatusToNotificationType = {
    2: "RejectedDocument",
    7: "ReworkDocument",
    4: "ApprovedDocument",
    8: "OnRegistrationDocument",
    9: "OOPZDocument",
    10: "CompletedDocument",
    0: "Signing",
  };

  static async addNotificationDocumentSigning(document, toId) {
    const notificationType =
      DocumentReadNotificationService.documentStatusToNotificationType[0];
    const func = DocumentIsReadModel.create({
      document_id: document.id,
      reader_id: toId,
      notification_type: notificationType,
    });
    return await DevTools.addDelay(func);
  }

  static async addNotificationDocumentStatusChange(document, newStatusId) {
    const notificationType =
      DocumentReadNotificationService.documentStatusToNotificationType[
        newStatusId
      ];
    const func = DocumentIsReadModel.create({
      document_id: document.id,
      reader_id: document.creator_id,
      notification_type: notificationType,
    });
    return await DevTools.addDelay(func);
  }

  static async readNotifications(userId, query) {
    const filter = {
      reader_id: userId,
      document_id: query.documentId,
      notification_type: query.notificationType,
    };
    const func = DocumentIsReadModel.readeNotifications({ filter });
    return await DevTools.addDelay(func);
  }

  static async getNotificationCount(userId, query) {
    const filter = {
      reader_id: userId,
      notification_type: query.notificationType,
      is_read: false,
    };
    if (query.isGetNotificationCount === "true") {
      const func = DocumentIsReadModel.getNotificationsCount({ filter });
      const result = await DevTools.addDelay(func);
      return result[0].count;
    } else {
      const func = DocumentIsReadModel.getNotifications({ filter });
      const result = await DevTools.addDelay(func);
      return result;
    }
  }
}

module.exports = DocumentReadNotificationService;
