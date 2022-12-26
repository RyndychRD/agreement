const UserModels = require("../../models/catalogModels/user-models");
const DevTools = require("../DevTools");

class UserService {
  async getAllUsers(query) {
    const func = UserModels.find({
      isAddForeignTables: query?.isAddForeignTables,
    });
    return await DevTools.addDelay(func);
  }
  async getOneUser(query) {
    const func = UserModels.findOne({
      filter: {
        id: query.id,
      },
      tables: query?.tables,
    });
    return await DevTools.addDelay(func);
  }
  async createNewUser(body) {
    const func = await UserModels.create({
      name: body.newUserName,
      is_signer: body.isSigner ? body.isSigner : false,
      department_id: body.departmentId,
    });
    return await DevTools.addDelay(func);
  }
  async deleteUser(query) {
    const func = await UserModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateUser(query, body) {
    const func = UserModels.update(
      {
        id: query.id,
      },
      {
        name: body.newUserName,
        is_signer: body.isSigner ? body.isSigner : false,
        department_id: body.departmentId,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new UserService();
