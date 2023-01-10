const RouteModels = require("../../models/constructorModels/route-models");
const { getOnePosition } = require("../catalogServices/position-service");
const { getOneUser } = require("../catalogServices/user-service");
const DevTools = require("../DevTools");

class RouteService {
  //Мы сначала получаем начальные значения по маршруту, а потом с помощью других моделей разыменовываем
  async getAllRoutes() {
    const func = RouteModels.find({});
    let result = await DevTools.addDelay(func);
    result = await Promise.all(
      result.map(async (routeType) => {
        return {
          ...routeType,
          route: await Promise.all(
            routeType.route.routeSteps.map(async (el) => {
              const position = await getOnePosition({ id: el.position_id });
              const default_signer =
                el.specified_signer_id !== -1
                  ? await getOneUser({ id: el.specified_signer_id })
                  : await getOneUser({}, { position_id: el.position_id });
              return {
                ...el,
                position,
                default_signer,
              };
            })
          ),
        };
      })
    );
    return result;
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
