import { api } from "../../http/index";

export default class RightService {
  static API_ROUTE = "/catalog/rights";

  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        right_id: el.id,
        right_name: el.name,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async create(values) {
    console.log("вызов в RightService -> Создать новую запись", values);
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в RightService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log("вызов в RightService -> Изменить существующую запись", values);
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.right_id}`,
      values
    );
    console.log(
      "вызов в RightService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в RightService -> Удалить запись", values);
    const response = await api.delete(
      `${this.API_ROUTE}?id=${values.right_id}`
    );
    console.log(
      "вызов в RightService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async getAll() {
    console.log("вызов в RightService -> Взять все записи");
    const response = await api.get(`${this.API_ROUTE}`);
    console.log(
      "вызов в RightService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne(id) {
    console.log("вызов в RightService -> Взять одну записи");
    const response = await api.get(`${this.API_ROUTE}?id=${id}`);
    console.log(
      "вызов в RightService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }
}
