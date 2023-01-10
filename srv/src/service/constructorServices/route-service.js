const RouteModels = require("../../models/constructorModels/route-models");
const DevTools = require("../DevTools");

class RouteService {
  async getAllRoutes() {
    const func = RouteModels.find({});
    return await DevTools.addDelay(func);
  }
  async getOneRoute(query) {
    const func = RouteModels.findOne({
      filter: {
        id: query.id,
      },
    });
    return await DevTools.addDelay(func);
  }
  async createNewRoute(body) {
    const func = await RouteModels.create({
      name: body.newRouteName,
    });
    return await DevTools.addDelay(func);
  }
  async deleteRoute(query) {
    const func = await RouteModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateRoute(query, body) {
    const func = RouteModels.update(
      {
        id: query.id,
      },
      {
        name: body.newRouteName,
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new RouteService();
