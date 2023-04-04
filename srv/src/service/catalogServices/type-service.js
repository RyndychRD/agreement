const TypeModels = require("../../models/catalogModels/type-models");
const DevTools = require("../DevTools");

class TypeService {
  async getAllTypes(query) {
    let filter = {};
    if (query.isShowOnlyForCreation === "true") {
      filter = {
        is_show_for_document_creation: true,
      };
    }
    const func = TypeModels.find({ filter });
    return await DevTools.addDelay(func);
  }
  async getOneType(query) {
    const func = TypeModels.findOne({
      filter: {
        id: query.id,
      },
    });
    return await DevTools.addDelay(func);
  }
  async createNewType(body) {
    const func = await TypeModels.create({
      name: body.newTypeName,
      is_route_construct_available: body.isRouteConstructAvailable,
      is_form_construct_available: body.isFormConstructAvailable,
      is_show_for_document_creation: body.isShowForDocumentCreation,
      is_file_upload_required: body.isFileUploadRequired,
    });
    return await DevTools.addDelay(func);
  }
  async deleteType(query) {
    const func = await TypeModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateType(query, body) {
    const func = TypeModels.update(
      {
        id: query.id,
      },
      {
        name: body.newTypeName,
        is_route_construct_available: body.isRouteConstructAvailable,
        is_form_construct_available: body.isFormConstructAvailable,
        is_show_for_document_creation: body.isShowForDocumentCreation,
        is_file_upload_required: body.isFileUploadRequired,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new TypeService();
