const DocumentTypeViewsModels = require("../../../models/constructorModels/form/document-type-views-models");
const DevTools = require("../../DevTools");

class DocumentTypeViewsModelsService {
  async getAllDocumentsTypeViews(query) {
    const func = DocumentTypeViewsModels.find({
      isAddForeignTables: query?.isAddForeignTables === "true",
    });
    return await DevTools.addDelay(func);
  }
  async getOneDocumentTypeView(query) {
    const func = DocumentTypeViewsModels.findOne({
      filter: {
        id: query.id,
      },
    });

    return await DevTools.addDelay(func);
  }
}

module.exports = new DocumentTypeViewsModelsService();
