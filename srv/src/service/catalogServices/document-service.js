const DocumentModels = require("../../models/catalogModels/document-models");
const DevTools = require("../DevTools");

class DocumentService {
  async getAllDocuments({ query, userId }) {
    let filter = {};
    if (query?.status && query?.status.trim() !== "0") {
      filter.document_status_id = query.status.trim();
    }

    //Мы обязательно должны передать пользователя.
    //Если мы не передали или передали пустого(-1) пользователя, то будем выводить ничего
    filter.creator_id = userId ? userId : -1;

    //При передачи этого флага удаляем ограничения на пользователя
    if (query?.isShowAllDocs === "true") {
      delete filter.creator_id;
    }

    const func = DocumentModels.find({
      isAddForeignTables: query?.isAddForeignTables.trim() === "true",
      isAddDocumentData: query?.isAddDocumentData.trim() === "true",
      isOnlyForSigningDocuments:
        query?.isOnlyForSigningDocuments.trim() === "true",
      isOnlyMySignedDocuments: query?.isOnlyMySignedDocuments.trim() === "true",
      filter,
      currentUser: userId,
    });
    return await DevTools.addDelay(func);
  }
  async getOneDocument(query) {
    const filter = {
      id: query.id,
    };
    const func = DocumentModels.findOne({
      isAddForeignTables: query?.isAddForeignTables === "true",
      isAddDocumentData: query?.isAddDocumentData === "true",
      filter,
    });
    return await DevTools.addDelay(func);
  }
  async createNewDocument(body) {
    const func = await DocumentModels.create({
      name: body.newDocumentName,
    });
    return await DevTools.addDelay(func);
  }
  async deleteDocument(query) {
    const func = await DocumentModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateDocument(query, body) {
    const func = DocumentModels.update(
      {
        id: query.id,
      },
      {
        name: body.newDocumentName,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new DocumentService();
