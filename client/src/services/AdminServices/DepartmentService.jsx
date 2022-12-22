import { api } from "../../http/index";

export default class DepartmentService {
  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        department_id: el.id,
        department_name: el.name,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async create(values) {
    console.log("вызов в DepartmentService -> Создать новую запись", values);
    const response = await api.post("/departments", values);
    console.log(
      "вызов в DepartamentService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log(
      "вызов в DepartmentService -> Изменить существующую запись",
      values
    );
    const response = await api.put(
      `/departments?id=${values.department_id}`,
      values
    );
    console.log(
      "вызов в DepartamentService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в DepartmentService -> Удалить запись", values);
    const response = await api.delete(
      `/departments?id=${values.department_id}`
    );
    console.log(
      "вызов в DepartamentService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async getAll() {
    console.log("вызов в DepartmentService -> Взять все записи");
    const response = await api.get("/departments");
    console.log(
      "вызов в DepartmentService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne(id) {
    console.log("вызов в DepartmentService -> Взять одну записи");
    const response = await api.get(`/departments?id=${id}`);
    console.log(
      "вызов в DepartmentService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }
}
