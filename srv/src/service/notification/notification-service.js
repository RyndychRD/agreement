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
const userModels = require("../../models/catalogModels/user-models");
const DevTools = require("../DevTools");
const userService = require("../catalogServices/user-service");

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
      const document = await DocumentModel.findOne({
        filter: { "documents.id": documentId },
      });

      // Либо мы посылаем нотификацию на конкретного пользователя, либо на группу лиц
      const StatusToNotificationType = {
        7: { name: "ReworkDocument", userIds: [document.creator_id] },
        4: { name: "Approved", userIds: [document.creator_id] },
        10: { name: "Completed", userIds: [document.creator_id] },
        2: { name: "Rejected", userIds: [document.creator_id] },
        9: {
          name: "SignedOOPZ",
          userIds: await userService
            .getUserOfRight(11)
            .then((result) => result.map((user) => user.id)),
        },
        8: {
          name: "OnRegistration",
          userIds: await userService
            .getUserOfRight(8)
            .then((result) => result.map((user) => user.id)),
        },
      };

      const status = await getOneStatus({ id: newDocumentStatusId });
      notifyDocumentStatusChangedEmail(document, status);
      if (StatusToNotificationType[newDocumentStatusId]) {
        StatusToNotificationType[newDocumentStatusId].userIds.forEach(
          (userId) => {
            addNotification(
              document.id,
              userId,
              StatusToNotificationType[newDocumentStatusId].name
            );
          }
        );
      }
    }
  }
  static async notifyDocumentTaskChanged(documentTaskId, newDocumentStatusId) {
    const documentTask = await DocumentTaskModel.getDocumentTask({
      filter: { id: documentTaskId },
    });
    const document = await DocumentModel.findOne({
      filter: { id: documentTask.document_id },
    });
    // Если таска только создана - то говорим о ее создании исполнителю.
    const StatusToNotificationType = {
      1: {
        name: "IncomeTask",
        userIds: [documentTask.executor_id],
        elementId: documentTask.id,
      },
    };
    // Для поручений, которые создаются и выполняются при регистрации договора
    if (documentTask.document_task_type_id === 3) {
      StatusToNotificationType[2] = {
        name: "OnRegistration",
        userIds: await userService
          .getUserOfRight(8)
          .then((result) => result.map((user) => user.id)),
        elementId: documentTask.document_id,
      };
    }
    // Для поручений, которые создаются и выполняются по требованию Михеевой
    if (documentTask.document_task_type_id === 2) {
      StatusToNotificationType[2] = {
        name: "Signing",
        userIds: documentTask.creator_id,
        elementId: documentTask.document_id,
      };
    }

    notifyDocumentTaskChangedEmail(documentTask, document, newDocumentStatusId);
    if (StatusToNotificationType[newDocumentStatusId]) {
      StatusToNotificationType[newDocumentStatusId].userIds.forEach(
        (userId) => {
          addNotification(
            StatusToNotificationType[newDocumentStatusId].elementId,
            userId,
            StatusToNotificationType[newDocumentStatusId].name
          );
        }
      );
    }
  }
}

module.exports = NotificationService;
