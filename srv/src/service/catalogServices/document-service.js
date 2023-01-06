const DocumentModels = require("../../models/catalogModels/document-models");
const DevTools = require("../DevTools");

class DocumentService {
  async getAllDocuments(query) {
    let filter = {};
    if (query?.status && query?.status !== "0") {
      filter.document_status_id = query.status;
    }
    if (query?.userId && query?.userId !== "-1") {
      filter.creator_id = query.userId;
    }
    const func = DocumentModels.find({
      isAddForeignTables: query?.isAddForeignTables === "true",
      isAddDocumentData: query?.isAddDocumentData === "true",
      filter,
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
