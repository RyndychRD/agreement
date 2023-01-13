const signingModel = require("../../models/documentSigning/signing-model");
const DevTools = require("../DevTools");

class SigningService {
  async getOneDocumentRoute(query) {
    const func = signingModel.findOne({
      filter: {
        "documents-signers_route.document_id": query.documentId,
      },
    });
    const route = await DevTools.addDelay(func);
    return route;
  }
}

module.exports = new SigningService();
