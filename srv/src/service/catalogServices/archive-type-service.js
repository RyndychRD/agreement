const ArchiveTypeModels = require("../../models/catalogModels/archive-type-models");
const DevTools = require("../DevTools");

class ArchiveTypeService {
  async getAllArchiveTypes() {
    const func = ArchiveTypeModels.find({});
    return await DevTools.addDelay(func);
  }
  async getOneArchiveType(query) {
    const func = ArchiveTypeModels.findOne({
      filter: {
        id: query.id,
      },
    });
    return await DevTools.addDelay(func);
  }
  async createNewArchiveType(body) {
    const func = await ArchiveTypeModels.create({
      name: body.newArchiveTypeName,
    });
    return await DevTools.addDelay(func);
  }
  async deleteArchiveType(query) {
    const func = await ArchiveTypeModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateArchiveType(query, body) {
    const func = ArchiveTypeModels.update(
      {
        id: query.id,
      },
      {
        name: body.newArchiveTypeName,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new ArchiveTypeService();
