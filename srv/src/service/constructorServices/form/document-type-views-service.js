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
        "document_type_views.id": query.id,
      },
      isAddForeignTables: query?.isAddForeignTables === "true",
    });

    return await DevTools.addDelay(func);
  }
  async createNewDocumentTypeView(body) {
    const func = await DocumentTypeViewsModels.create({
      document_type_id: body.typeId,
      view: {
        elements_order: body.elementsOrder.map((element) => {
          return {
            ...element,
          };
        }),
      },
      view_print: {
        elements_order: body.elementsOrder.map((element) => {
          return {
            ...element,
          };
        }),
      },
    });
    return await DevTools.addDelay(func);
  }
  async updateDocumentTypeView(query, body) {
    const func = DocumentTypeViewsModels.update(
      {
        id: query.id,
      },
      {
        view: {
          elements_order: body.elementsOrder.map((element) => {
            return {
              ...element,
            };
          }),
        },
        view_print: {
          elements_order: body.elementsOrder.map((element) => {
            return {
              ...element,
            };
          }),
        },
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new DocumentTypeViewsModelsService();
