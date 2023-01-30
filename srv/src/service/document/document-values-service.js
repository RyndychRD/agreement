const DocumentValuesModels = require("../../models/document/document-values-models");
const DevTools = require("../DevTools");

class DocumentValuesService {
  async getOneDocumentValues(query) {
    const func = DocumentValuesModels.findOneDocumentValues({
      filter: {
        document_id: query.documentId,
      },
    });
    return await DevTools.addDelay(func);
  }
}

module.exports = new DocumentValuesService();
