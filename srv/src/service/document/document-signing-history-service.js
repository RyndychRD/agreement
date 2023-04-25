const DocumentSigningHistoryModel = require("../../models/document/document-signing-history-model");

class SigningHistoryService {
  static async create({ stepId, signerId }) {
    const history = {
      "documents-signers_route_id": stepId,
      signer_id: signerId,
      created_at: "now",
    };
    return DocumentSigningHistoryModel.create(history);
  }

  static async findHistoryByStepId(stepId) {
    return await DocumentSigningHistoryModel.find({
      "documents-signers_route_id": stepId,
    });
  }
}

module.exports = SigningHistoryService;
