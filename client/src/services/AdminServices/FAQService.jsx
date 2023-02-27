import { api } from "../../http/index";

export default class FAQService {
  static API_ROUTE = "/FAQ";

  static async getAll() {
    console.log("вызов в FAQService -> Взять все записи");
    const response = await api.get(`${this.API_ROUTE}`);
    console.log(
      "вызов в FAQService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }
}
