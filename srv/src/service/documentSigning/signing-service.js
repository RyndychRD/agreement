const SigningModel = require("../../models/documentSigning/signing-model");
const { getOneUser } = require("../catalogServices/user-service");
const {
  getOneType,
} = require("../catalogServices/document-signature-type-service");
const DevTools = require("../DevTools");
const {
  incrementDocumentLastSignedStepBySignedStepId,
} = require("../catalogServices/document-service");

class SigningService {
  async getOneDocumentRoute(query) {
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

  async signCurrentDocumentStep({ body, userId }) {
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
    await func;
    return await DevTools.addDelay(
      incrementDocumentLastSignedStepBySignedStepId({
        stepId: body.currentStepId,
      })
    );
  }
}

module.exports = new SigningService();
