const SigningModel = require("../../models/document/document-signing-model");
const DocumentModel = require("../../models/catalogModels/document-models");
const { getOneStatus } = require("../catalogServices/document-status-service");
const {
  notifyDocumentSigningEmail,
  notifyDocumentStatusChangedEmail,
} = require("./email-notification-service");
const {
  addNotificationDocumentSigning,
  addNotificationDocumentStatusChange,
} = require("./document-read-notification-service");

class NotificationService {
  static async notifyDocumentSigning(documentId) {
    const currentSigningStep = await SigningModel.getCurrentDocumentSigningStep(
      documentId
    );
    //Перед нотификацией шаг подписания увеличился. Если у нас есть шаг, то отправляем нотификацию новому пользователю
    if (currentSigningStep) {
      const document = await DocumentModel.findOne({
        filter: {
          id: documentId,
        },
      });
      const toId = currentSigningStep?.deputy_signer_id
        ? currentSigningStep.deputy_signer_id
        : currentSigningStep.signer_id;
      notifyDocumentSigningEmail(document, toId);
      addNotificationDocumentSigning(document, toId);
    }
  }

  static async notifyDocumentStatusChanged(documentId, newDocumentStatusId) {
    //Если документ в работе, то значит он вернулся из На доработку и надо отправить сообщение о подписании
    if (newDocumentStatusId == 5) {
      this.notifyDocumentSigning(documentId);
    } else {
      const document = await DocumentModel.findOne({
        filter: { id: documentId },
      });
      const status = await getOneStatus({ id: newDocumentStatusId });
      notifyDocumentStatusChangedEmail(document, status);
      addNotificationDocumentStatusChange(document, newDocumentStatusId);
    }
  }
}

module.exports = NotificationService;
