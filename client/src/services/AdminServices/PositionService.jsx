import { api } from "../../http/index";

export default class PositionService {
  static API_ROUTE = "/catalog/positions";

  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        position_id: el.id,
        position_name: el.name,
        position_is_signer: el.is_signer,
        department_name: el.department_name,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getAll(isAddForeignTables) {
    console.log("вызов в PositionService -> Взять все записи");
    const response = await api.get(
      `${this.API_ROUTE}?isAddForeignTables=${isAddForeignTables}`
    );
    console.log(
      "вызов в PositionService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne(id) {
    console.log("вызов в PositionService -> Взять одну записи");
    const response = await api.get(`${this.API_ROUTE}?id=${id}`);
    console.log(
      "вызов в PositionService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в PositionService -> Удалить запись", values);
    const response = await api.delete(
      `${this.API_ROUTE}?id=${values.position_id}`
    );
    console.log(
      "вызов в PositionService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async create(values) {
    console.log("вызов в PositionService -> Создать новую запись", values);
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в PositionService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log(
      "вызов в PositionService -> Изменить существующую запись",
      values
    );
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.position_id}`,
      values
    );
    console.log(
      "вызов в PositionService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }
}
