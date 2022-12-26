import { api } from "../../http/index";

export default class UserAdminService {
  static API_ROUTE = "/catalog/users";

  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        user_id: el.id,
        user_login: el.login,
        user_email: el.email,
        user_fio: `${el.last_name} ${el.first_name} ${el.middle_name}`,
        position_name: el.position_name,
        department_name: el.department_name,
        user_is_active: el.is_active,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getAll(isAddForeignTables) {
    console.log("вызов в UserAdminService -> Взять все записи");
    const response = await api.get(
      `${this.API_ROUTE}?isAddForeignTables=${isAddForeignTables}`
    );
    console.log(
      "вызов в UserAdminService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne(id) {
    console.log("вызов в UserAdminService -> Взять одну записи");
    const response = await api.get(`${this.API_ROUTE}?id=${id}`);
    console.log(
      "вызов в UserAdminService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в UserAdminService -> Удалить запись", values);
    const response = await api.delete(
      `${this.API_ROUTE}?id=${values.position_id}`
    );
    console.log(
      "вызов в UserAdminService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async create(values) {
    console.log("вызов в UserAdminService -> Создать новую запись", values);
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в UserAdminService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log(
      "вызов в UserAdminService -> Изменить существующую запись",
      values
    );
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.position_id}`,
      values
    );
    console.log(
      "вызов в UserAdminService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }
}
