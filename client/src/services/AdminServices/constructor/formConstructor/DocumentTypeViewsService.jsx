import { api } from "../../../../http/index";

export default class DocumentTypesViewsService {
  static API_ROUTE = "/constructor/forms/types-views";

  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        type_view_id: el.id,
        type_name: el.document_type_name,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getAll({ isAddForeignTables }) {
    console.log("вызов в DocumentTypesViewsService -> Взять все записи");
    const response = await api.get(
      `${this.API_ROUTE}?isAddForeignTables=${isAddForeignTables}`
    );
    console.log(
      "вызов в DocumentTypesViewsService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne({ id }) {
    console.log("вызов в DocumentTypesViewsService -> Взять одну запись");
    const response = await api.get(`${this.API_ROUTE}?id=${id}`);
    console.log(
      "вызов в DocumentTypesViewsService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }
}
