import { api } from "../../http/index";

export default class PositionService {
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        position_id: el.id,
        position_name: el.name,
        department_name: el.department_name,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getAll() {
    console.log("вызов в PositionService -> Взять все записи");
    const response = await api.get("/positions");
    console.log(
      "вызов в PositionService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne(id) {
    console.log("вызов в PositionService -> Взять одну записи");
    const response = await api.get(`/positions?id=${id}`);
    console.log(
      "вызов в PositionService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }
}
