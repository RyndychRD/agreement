import { Alert } from "antd";
import { api } from "../../../http/index";
import { userNameMask } from "../../CommonFunctions";

export default class RouteService {
  static API_ROUTE = "/constructor/routes";

  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        route_id: el.id,
        type_id: el.document_type_id,
        type_name: el.document_type_name,
        type_name_for_delete: el.document_type_name,
        children: el.route?.map((route, index) => ({
          key: `${el.id}-${index}`,
          type_name_for_delete: el.document_type_name,
          route_id: index + 1,
          position_route_constructor: route.position.name,
          user_fio_route_constructor: route.default_signer ? (
            userNameMask(route.default_signer)
          ) : (
            <Alert
              message="НА ДОЛЖНОСТЬ НЕ НАЗНАЧЕНО НИ ОДНОГО ПОЛЬЗОВАТЕЛЯ!"
              type="error"
            />
          ),
        })),
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
      `${this.API_ROUTE}?id=${values.route_id}`,
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
      `${this.API_ROUTE}?id=${values.route_id}`
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
