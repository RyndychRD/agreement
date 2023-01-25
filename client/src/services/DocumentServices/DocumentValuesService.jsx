import { api } from "../../http/index";

export default class DocumentValuesService {
  static API_ROUTE = "/documents/values";

  static async getOneDocumentValues(documentId) {
    console.log(
      `вызов в DocumentValuesService -> Взять значения по одному документу c ID=${documentId}`
    );
    const response = await api.get(
      `${this.API_ROUTE}?documentId=${documentId}`
    );
    console.log(
      "вызов в DocumentValuesService -> Взять значения по одному документу -> результат",
      response
    );
    return response.data;
  }
}
