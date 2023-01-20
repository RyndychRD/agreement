const RouteModels = require("../../models/constructorModels/route-models");
const { getOnePosition } = require("../catalogServices/position-service");
const { getOneUser } = require("../catalogServices/user-service");
const DevTools = require("../DevTools");

class RouteService {
  /**
   * Собирает информацию по одному шагу подписания документа, разыменовывая должность и ФИО из идшников
   * @param {*} routeStep
   * @returns
   */
  async getRouteStepInformation(routeStep) {
    const position = await getOnePosition({ id: routeStep.position_id });
    const default_signer =
      routeStep.specified_signer_id !== -1
        ? await getOneUser({ id: routeStep.specified_signer_id })
        : await getOneUser({}, { position_id: routeStep.position_id });
    return { position, default_signer };
  }

  /**
   * Собирает информацию по массиву из шагов подписания документа
   * @param {*} routeSteps
   * @returns
   */
  async getRouteInformation(routeSteps) {
    if (!routeSteps) return null;
    return await Promise.all(
      routeSteps.map(async (routeStep) => {
        return {
          ...routeStep,
          ...(await this.getRouteStepInformation(routeStep)),
        };
      })
    );
  }

  //Мы сначала получаем начальные значения по маршруту, а потом с помощью других моделей разыменовываем
  async getAllRoutes() {
    const func = RouteModels.find({});
    const routeAndTypes = await DevTools.addDelay(func);
    return await Promise.all(
      routeAndTypes.map(async (routeAndType) => {
        return {
          ...routeAndType,
          route: await this.getRouteInformation(routeAndType?.route.routeSteps),
        };
      })
    );
  }

  async getOneRoute(query) {
    let filter = {};
    if (query?.id) {
      filter = { ...filter, "document_type_default_routes.id": query.id };
    }
    if (query?.documentTypeId) {
      filter = {
        ...filter,
        "document_type_default_routes.document_type_id": query.documentTypeId,
      };
    }
    const func = RouteModels.findOne({
      filter,
    });
    const routeAndType = await DevTools.addDelay(func);
    return {
      ...routeAndType,
      route: await this.getRouteInformation(routeAndType?.route.routeSteps),
    };
  }
  async createNewRoute(body) {
    const func = await RouteModels.create({
      document_type_id: body.typeId,
      route: {
        routeSteps: body.routeSteps.map((step) => {
          return {
            ...step,
            specified_signer_id: step.specified_signer_id
              ? step.specified_signer_id
              : -1,
          };
        }),
      },
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
        route: {
          routeSteps: body.routeSteps.map((step) => {
            return {
              ...step,
              specified_signer_id: step.specified_signer_id
                ? step.specified_signer_id
                : -1,
            };
          }),
        },
      }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new RouteService();
