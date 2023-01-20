const UserService = require("../../service/catalogServices/user-service");
const routeService = require("../../service/constructorServices/route-service");

class UserController {
  async getUsers(req, res, next) {
    try {
      const data = req?.query?.id
        ? await UserService.getOneUser(req?.query)
        : await UserService.getAllUsers(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createNewUser(req, res, next) {
    try {
      const data = await UserService.createNewUser(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateUser(req, res, next) {
    try {
      const data = await UserService.updateUser(req.query, req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const data = await UserService.deleteUser(req.query);
      //Также чистим все дефолтные маршруты в documents_type_default_routes
      // Надо будет перенести в сервис юзера, но сраные циклические зависимости против(
      await routeService.deleteUserFromAllRoutes(req.query.id);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
