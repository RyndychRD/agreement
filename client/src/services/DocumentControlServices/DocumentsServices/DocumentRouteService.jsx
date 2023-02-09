import { api } from "../../../http/index";

export default class DocumentRouteService {
  static API_ROUTE = "/documents/route";

  static async getOne(documentId) {
    console.log(
      `вызов в DocumentRouteService -> Взять записи по одному документу c ID=${documentId}`
    );
    const response = await api.get(
      `${this.API_ROUTE}/get-route?documentId=${documentId}`
    );
    console.log(
      "вызов в DocumentRouteService -> Взять записи по одному документу -> результат",
      response
    );
    return response.data;
  }

  static async create(values) {
    console.log("вызов в DocumentRouteService -> Создать новую запись", values);
    const response = await api.post(`${this.API_ROUTE}/create-route`, values);
    console.log(
      "вызов в DocumentRouteService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async signCurrentStep(values) {
    console.log(
      "вызов в DocumentRouteService -> Подписать текущий шаг документа",
      values
    );
    const response = await api.put(
      `${this.API_ROUTE}/sign-current-step`,
      values
    );
    console.log(
      "вызов в DocumentRouteService -> Подписать текущий шаг документа -> результат",
      response
    );
    return response.data;
  }

  static async unsignLastStep(values) {
    console.log(
      "вызов в DocumentRouteService -> Отменить подписание последнего шага документа",
      values
    );
    const response = await api.put(
      `${this.API_ROUTE}/unsign-last-step`,
      values
    );
    console.log(
      "вызов в DocumentRouteService -> Отменить подписание последнего шага документа -> результат",
      response
    );
    return response.data;
  }

  static async update({ documentId, routeSteps }) {
    console.log(
      `вызов в DocumentRouteService -> Обновить маршрут документа ${documentId}`,
      routeSteps
    );
    const response = await api.put(
      `${this.API_ROUTE}/update-route?documentId=${documentId}`,
      routeSteps
    );
    console.log(
      `вызов в DocumentRouteService -> Обновить маршрут документа ${documentId}-> результат `,
      response
    );
    return response.data;
  }
}
