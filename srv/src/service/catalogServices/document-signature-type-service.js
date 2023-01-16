const DocumentSignatureTypeModels = require("../../models/catalogModels/document-signature-type-model");
const DevTools = require("../DevTools");

class DocumentSignatureTypeService {
  async getAllTypes() {
    const func = DocumentSignatureTypeModels.find({});
    return await DevTools.addDelay(func);
  }
  async getOneType(query) {
    let filter = {};
    if (query?.id && query.id !== -1) {
      filter["document_signature_types.id"] = query.id;
    }
    const func = DocumentSignatureTypeModels.findOne({
      filter: {
        id: query.id,
      },
    });
    return await DevTools.addDelay(func);
  }
  async createNewType(body) {
    const func = await DocumentSignatureTypeModels.create({
      name: body.newTypeName,
    });
    return await DevTools.addDelay(func);
  }
  async deleteType(query) {
    const func = await DocumentSignatureTypeModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateType(query, body) {
    const func = DocumentSignatureTypeModels.update(
      {
        id: query.id,
      },
      {
        name: body.newTypeName,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new DocumentSignatureTypeService();
