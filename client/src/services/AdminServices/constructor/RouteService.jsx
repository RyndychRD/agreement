import { api } from "../../../http/index";
import { userNameMask } from "../../CommonFunctions";

export default class RouteService {
  static API_ROUTE = "/constructor/routes";

  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        type_name: el.type_name,
        position_name: el.position_name,
        user_fio: userNameMask(el),
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async create(values) {
    console.log("вызов в RouteService -> Создать новую запись", values);
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в RouteService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log("вызов в RouteService -> Изменить существующую запись", values);
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.right_id}`,
      values
    );
    console.log(
      "вызов в RouteService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в RouteService -> Удалить запись", values);
    const response = await api.delete(
      `${this.API_ROUTE}?id=${values.right_id}`
    );
    console.log(
      "вызов в RouteService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async getAll() {
    console.log("вызов в RouteService -> Взять все записи");
    const response = await api.get(`${this.API_ROUTE}`);
    console.log(
      "вызов в RouteService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne(id) {
    console.log("вызов в RouteService -> Взять одну записи");
    const response = await api.get(`${this.API_ROUTE}?id=${id}`);
    console.log(
      "вызов в RouteService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }
}
