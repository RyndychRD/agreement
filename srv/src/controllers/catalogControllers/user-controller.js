const UserService = require("../../service/catalogServices/user-service");

class UserController {
  async getUsers(req, res, next) {
    try {
      const departmentData = req?.query?.id
        ? await UserService.getOneUser(req?.query)
        : await UserService.getAllUsers(req?.query);
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async createNewUser(req, res, next) {
    try {
      const departmentData = await UserService.createNewUser(req.body);
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async updateUser(req, res, next) {
    try {
      const departmentData = await UserService.updateUser(req.query, req.body);
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const departmentData = await UserService.deleteUser(req.query);
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
