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

  static async delete(values) {
    console.log("вызов в DocumentTypesViewsService -> Удалить запись", values);
    const response = await api.delete(
      `${this.API_ROUTE}?id=${values.type_view_id}`
    );
    console.log(
      "вызов в DocumentTypesViewsService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async create(values) {
    console.log(
      "вызов в DocumentTypesViewsService -> Создать новую запись",
      values
    );
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в DocumentTypesViewsService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log(
      "вызов в DocumentTypesViewsService -> Изменить существующую запись",
      values
    );
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.document_types_views_id}`,
      values
    );
    console.log(
      "вызов в DocumentTypesViewsService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }
}
