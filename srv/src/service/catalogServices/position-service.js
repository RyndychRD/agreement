const PositionModels = require("../../models/catalogModels/position-models");
const DevTools = require("../DevTools");

class PositionService {
  async getAllPositions(query) {
    const func = PositionModels.find({
      isAddForeignTables: query?.isAddForeignTables,
    });
    return await DevTools.addDelay(func);
  }
  async getOnePosition(query) {
    const func = PositionModels.findOne({
      filter: {
        id: query.id,
      },
      isAddForeignTables: query?.isAddForeignTables,
    });
    return await DevTools.addDelay(func);
  }
  async createNewPosition(body) {
    const func = await PositionModels.create({
      name: body.newPositionName,
      is_signer: body.isSigner ? body.isSigner : false,
      department_id: body.departmentId,
    });
    return await DevTools.addDelay(func);
  }
  async deletePosition(query) {
    const func = await PositionModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updatePosition(query, body) {
    const func = PositionModels.update(
      {
        id: query.id,
      },
      {
        name: body.newPositionName,
        is_signer: body.isSigner ? body.isSigner : false,
        department_id: body.departmentId,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new PositionService();
