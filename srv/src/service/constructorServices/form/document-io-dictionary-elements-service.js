const DocumentsIODictionaryElementsModels = require("../../../models/constructorModels/form/document-io-dictionary-element-models");
const DevTools = require("../../DevTools");

class DocumentTypeViewsModelsService {
  async getAllDocumentsIODictionaryElements(query) {
    const func = DocumentsIODictionaryElementsModels.find({});
    return await DevTools.addDelay(func);
  }
  async getOneDocumentsIODictionaryElement(query) {
    const func = DocumentsIODictionaryElementsModels.findOne({
      filter: {
        id: query.id,
      },
    });

    return await DevTools.addDelay(func);
  }
}

module.exports = new DocumentTypeViewsModelsService();
