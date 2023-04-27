const SigningModel = require("../../models/document/document-signing-model");
const { getOneUser } = require("../catalogServices/user-service");
const {
  getOneType,
} = require("../catalogServices/document-signature-type-service");
const DevTools = require("../DevTools");
const { changeDocumentLastSignedStep } = require("./document-service");
const NotificationService = require("../notification/notification-service");
const NotificationIsReadService = require("../notification/notification-is-read-service");
const DocumentService = require("./document-service");
const documentSigningHistoryModel = require("../../models/document/document-signing-history-model");
const { findHistoryByStepId } = require("./document-signing-history-service");
const SigningHistoryService = require("./document-signing-history-service");
const documentSigningModel = require("../../models/document/document-signing-model");
const { SocketService } = require("../socket/socket-service");

class SigningService {
  static async getOneDocumentRoute(query) {
    const func = SigningModel.findOneDocument({
      filter: {
        "documents-signers_route.document_id": query.documentId,
      },
    });

    const steps = await DevTools.addDelay(func);
    return await Promise.all(
      steps.map(async (step) => {
        return {
          ...step,
          signer: await getOneUser({
            id: step.signer_id ? step.signer_id : "-1",
            isAddForeignTables: "true",
          }),
          actual_signer: await getOneUser({
            id: step.actual_signer_id ? step.actual_signer_id : "-1",
            isAddForeignTables: "true",
          }),
          document_signature_type: await getOneType({
            id: step.document_signature_type_id
              ? step.document_signature_type_id
              : "-1",
          }),
          document_signature_history: await findHistoryByStepId(step.id),
        };
      })
    );
  }

  static async signCurrentDocumentStep({ body, userId }) {
    const func = SigningModel.signCurrentStep({
      filter: {
        id: body.currentStepId,
      },
      sign: {
        remark: body?.remark,
        document_signature_type_id: body.signatureTypeId,
        actual_signer_id: userId,
        sign_date: "now",
      },
    });
    const document = await func;
    const documentId = document[0].document_id;
    NotificationService.notifyDocumentSigning(documentId);
    await DocumentService.updateDocument({ id: documentId }, { newRemark: "" });
    const increaseDocumentLastSignedStep = changeDocumentLastSignedStep({
      documentId,
      isIncrement: true,
    });
    return await DevTools.addDelay(increaseDocumentLastSignedStep);
  }

  static async unsignCurrentDocumentStep({ body }) {
    const func = SigningModel.unsignLastStep({
      filter: {
        id: body.previousSignStepId,
      },
    });
    const document = await func;
    const documentId = document[0].document_id;
    NotificationService.notifyDocumentSigning(documentId);
    const decreaseDocumentLastSignedStep = changeDocumentLastSignedStep({
      documentId,
      isIncrement: false,
    });
    return await DevTools.addDelay(decreaseDocumentLastSignedStep);
  }

  static async getDocumentCurrentSignStep(documentId) {
    const func = SigningModel.getCurrentDocumentSigningStep(documentId);
    return await DevTools.addDelay(func);
  }

  static async update({ documentId, routeSteps }) {
    // Очищаем нотификацию по неподписанным шагам
    NotificationIsReadService.readNotifications(undefined, {
      elementId: documentId,
      notificationType: "Signing",
    });

    let result = [];
    // Если маршрут сократили, то удаляем все сокращенные шаги
    documentSigningModel.deleteRouteSteps(
      documentId,
      routeSteps &&
        routeSteps.length > 0 &&
        routeSteps[routeSteps.length - 1]?.step
        ? routeSteps[routeSteps.length - 1].step
        : 0
    );
    if (routeSteps.length > 0) {
      Promise.all(
        routeSteps.map(async (step) => {
          if (!step.previous_signer_id) {
            return SigningModel.create(step);
          }
          if (
            step.previous_signer_id &&
            step.previous_signer_id !== step.signer_id
          ) {
            const filter = {
              document_id: documentId,
              step: step.step,
            };
            return SigningModel.update(filter, {
              signer_id: step.signer_id,
            }).then((signingStepId) => {
              SigningHistoryService.create({
                stepId: signingStepId[0].id,
                signerId: step.previous_signer_id,
              });
            });
          }
        })
      ).then(() => {
        NotificationService.notifyDocumentSigning(documentId);
      });
    }
    return result;
  }
}

module.exports = SigningService;
