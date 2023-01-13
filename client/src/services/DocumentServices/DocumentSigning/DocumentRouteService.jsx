import { api } from "../../../http/index";

export default class DocumentRouteService {
  static API_ROUTE = "/document-signing/route";

  static async getOne(documentId) {
    console.log(
      `вызов в DocumentRouteService -> Взять записи по одному документу c ID=${documentId}`
    );
    const response = await api.get(
      `${this.API_ROUTE}?documentId=${documentId}`
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
}
