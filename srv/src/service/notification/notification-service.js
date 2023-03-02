const SigningModel = require("../../models/document/document-signing-model");
const DocumentModel = require("../../models/catalogModels/document-models");
const { getOneStatus } = require("../catalogServices/document-status-service");
const {
  notifyDocumentSigningEmail,
  notifyDocumentStatusChangedEmail,
  notifyDocumentTaskChangedEmail,
} = require("./email-notification-service");
const { addNotification } = require("./notification-is-read-service");
const DocumentTaskModel = require("../../models/documentTaskModels/document-task-model");

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
      addNotification(document.id, toId, "Signing");
    }
  }

  static async notifyDocumentStatusChanged(documentId, newDocumentStatusId) {
    //Если документ в работе, то значит он вернулся из На доработку и надо отправить сообщение о подписании
    if (newDocumentStatusId == 5) {
      this.notifyDocumentSigning(documentId);
    } else {
      const StatusToNotificationType = {
        7: "ReworkDocument",
      };

      const document = await DocumentModel.findOne({
        filter: { "documents.id": documentId },
      });
      const status = await getOneStatus({ id: newDocumentStatusId });
      notifyDocumentStatusChangedEmail(document, status);
      if (StatusToNotificationType[newDocumentStatusId]) {
        addNotification(
          document.id,
          document.creator_id,
          StatusToNotificationType[newDocumentStatusId]
        );
      }
    }
  }
  static async notifyDocumentTaskChanged(documentTaskId, newDocumentStatusId) {
    // Если таска только создана - то говорим о ее создании исполнителю.
    // Если таска закрыта(статус 2) - то говорим об этом создателю таски. Добавлю позже, если будет бизнес необходимость
    const StatusToNotificationType = {
      1: "IncomeTask",
    };

    const documentTask = await DocumentTaskModel.getDocumentTask({
      filter: { id: documentTaskId },
    });
    const document = await DocumentModel.findOne({
      filter: { id: documentTask.document_id },
    });

    notifyDocumentTaskChangedEmail(documentTask, document, newDocumentStatusId);
    if (StatusToNotificationType[newDocumentStatusId]) {
      addNotification(
        documentTask.id,
        documentTask.executor_id,
        StatusToNotificationType[newDocumentStatusId]
      );
    }
  }
}

module.exports = NotificationService;
