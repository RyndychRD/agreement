const RightModels = require("../../models/catalogModels/right-models");
const DevTools = require("../DevTools");

class RightService {
  async getAllRights() {
    const func = RightModels.find({});
    return await DevTools.addDelay(func);
  }
  async getOneRight(query) {
    const func = RightModels.findOne({
      filter: {
        id: query.id,
      },
    });
    return await DevTools.addDelay(func);
  }
  async createNewRight(body) {
    const func = await RightModels.create({
      name: body.newRightName,
    });
    return await DevTools.addDelay(func);
  }
  async deleteRight(query) {
    const func = await RightModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateRight(query, body) {
    const func = RightModels.update(
      {
        id: query.id,
      },
      {
        name: body.newRightName,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new RightService();
