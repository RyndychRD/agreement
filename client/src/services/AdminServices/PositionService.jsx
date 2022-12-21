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

  //    static async create(values) {
  //       console.log("вызов в DepartmentService -> Создать новую запись", values)
  //       const response = await api.post("/departments/create", values)
  //       console.log(
  //          "вызов в DepartamentService -> Создать новую запись -> результат",
  //          response
  //       )
  //       return response.data
  //    }

  //    static async update(values) {
  //       console.log(
  //          "вызов в DepartmentService -> Изменить существующую запись",
  //          values
  //       )
  //       const response = await api.post("/departments/update", values)
  //       console.log(
  //          "вызов в DepartamentService -> Изменить существующую запись -> результат",
  //          response
  //       )
  //       return response.data
  //    }

  //    static async delete(values) {
  //       console.log("вызов в DepartmentService -> Удалить запись", values)
  //       const response = await api.post("/departments/delete", values)
  //       console.log(
  //          "вызов в DepartamentService -> Удалить запись -> результат",
  //          response
  //       )
  //       return response.data
  //    }

  static async getAll() {
    console.log("вызов в PositionService -> Взять все записи");
    const response = await api.get("/positions");
    console.log(
      "вызов в PositionService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }
}
