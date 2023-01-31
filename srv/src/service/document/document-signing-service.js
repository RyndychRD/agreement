const SigningModel = require("../../models/document/document-signing-model");
const { getOneUser } = require("../catalogServices/user-service");
const {
  getOneType,
} = require("../catalogServices/document-signature-type-service");
const DevTools = require("../DevTools");
const { changeDocumentLastSignedStep } = require("./document-service");
const NotificationService = require("../notification/notification-service");

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
          deputy_signer: await getOneUser({
            id: step.deputy_signer_id ? step.deputy_signer_id : "-1",
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
}

module.exports = SigningService;
