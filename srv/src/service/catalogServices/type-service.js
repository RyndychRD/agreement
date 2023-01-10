const TypeModels = require("../../models/catalogModels/type-models");
const DevTools = require("../DevTools");

class TypeService {
  async getAllTypes() {
    const func = TypeModels.find({});
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
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new TypeService();
