const UserModels = require("../../models/catalogModels/user-models");
const DevTools = require("../DevTools");
const LoginService = require("../login-service");

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
      isAddForeignTables: query?.isAddForeignTables,
    });
    return await DevTools.addDelay(func);
  }

  async createNewUser(body) {
    const func = await LoginService.createUser({
      login: body.newLogin,
      email: body?.newEmail ? body.newEmail : "",
      last_name: body.newLastName,
      first_name: body.newFirstName,
      middle_name: body.newMiddleName,
      is_disabled: false,
      password: body.newPassword,
      position_id: body.positionId,
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
    const pass = body.newPassword
      ? { password: await LoginService.createPass(body.newPassword) }
      : {};
    const func = UserModels.update(
      {
        id: query.id,
      },
      {
        login: body.newLogin,
        email: body.newEmail,
        ...pass,
        first_name: body.newFirstName,
        last_name: body.newLastName,
        middle_name: body.newMiddleName,
        position_id: body.positionId,
        is_disabled: body.isDisabled,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new UserService();
