const UserModels = require("../../models/catalogModels/user-models");
const DevTools = require("../DevTools");
const LoginService = require("../login-service");

class UserService {
  async getAllUsers(query) {
    const func = UserModels.find({
      isAddForeignTables: query?.isAddForeignTables === "true",
      isAddRights: query?.isAddRights === "true",
    });
    return await DevTools.addDelay(func);
  }

  async getOneUser(query, customFilter = {}) {
    let filter = { ...customFilter };
    if (query?.id && query.id !== -1) {
      filter["users.id"] = query.id;
    }
    const func = UserModels.findOne({
      filter,
      isAddForeignTables: query?.isAddForeignTables === "true",
      isAddRights: query?.isAddRights === "true",
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
      rightIds: body.rightIds,
    });
    return await DevTools.addDelay(func);
  }

  async deleteUser(query) {
    const func = await UserModels.deleteOne({
      id: query.id,
    });
    const deletedUserResponse = await DevTools.addDelay(func);

    return deletedUserResponse;
  }

  async updateUser(query, body) {
    const pass = body.newPassword
      ? { password: await LoginService.createPass(body.newPassword) }
      : {};
    const func = UserModels.update({
      filter: {
        id: query.id,
      },
      user: {
        login: body.newLogin,
        email: body.newEmail,
        ...pass,
        first_name: body.newFirstName,
        last_name: body.newLastName,
        middle_name: body.newMiddleName,
        position_id: body.positionId,
        is_disabled: body.isDisabled,
      },
      userRights: body.rightIds,
    });
    return await DevTools.addDelay(func);
  }
}

module.exports = new UserService();
