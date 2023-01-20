const RouteService = require("../../service/constructorServices/route-service");

class RouteController {
  async getRoutes(req, res, next) {
    try {
      const data =
        req?.query?.id || req?.query?.documentTypeId
          ? await RouteService.getOneRoute(req?.query)
          : await RouteService.getAllRoutes(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createNewRoute(req, res, next) {
    try {
      const data = await RouteService.createNewRoute(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateRoute(req, res, next) {
    try {
      const data = await RouteService.updateRoute(req.query, req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteRoute(req, res, next) {
    try {
      const data = await RouteService.deleteRoute(req.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RouteController();
