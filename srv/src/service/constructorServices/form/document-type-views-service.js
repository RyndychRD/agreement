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
  async createNewDocumentTypeView(body) {
    const func = await DocumentTypeViewsModels.create({
      key: body.newKey,
      document_type_id: body.newDocumentTypeId,
      view: body.newView,
      view_print: body.newViewPrint,
    });
    return await DevTools.addDelay(func);
  }
  async deleteDocumentTypeView(query) {
    const func = await DocumentTypeViewsModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateDocumentTypeView(query, body) {
    const func = DocumentTypeViewsModels.update(
      {
        id: query.id,
      },
      {
        document_type_id: body.newDocumentTypeId,
        view: body.newView,
        view_print: body.newViewPrint,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new DocumentTypeViewsModelsService();
