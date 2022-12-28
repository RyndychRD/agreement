import { api } from "../../http/index";

export default class UserService {
  static API_ROUTE = "/catalog/users";

  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        user_id: el.id,
        user_login: el.login,
        user_email: el.email,
        user_fio: `${el.last_name} ${el.first_name} ${
          el.middle_name ? el.middle_name : ""
        }`,
        position_name: el.position_name,
        department_name: el.department_name,
        user_is_disabled: el.is_disabled,
        rights_list: el?.rights
          ?.concat(el?.rights_inherited_position)
          .concat(el?.rights_inherited_department),
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getAll({ isAddForeignTables, isAddRights }) {
    console.log("вызов в UserService -> Взять все записи");
    const response = await api.get(
      `${this.API_ROUTE}?isAddForeignTables=${isAddForeignTables}&isAddRights=${isAddRights}`
    );
    console.log(
      "вызов в UserService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne({ id, isAddRights }) {
    console.log("вызов в UserService -> Взять одну записи");
    const response = await api.get(
      `${this.API_ROUTE}?id=${id}&isAddRights=${isAddRights}`
    );
    console.log(
      "вызов в UserService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в UserService -> Удалить запись", values);
    const response = await api.delete(`${this.API_ROUTE}?id=${values.user_id}`);
    console.log("вызов в UserService -> Удалить запись -> результат", response);
    return response.data;
  }

  static async create(values) {
    console.log("вызов в UserService -> Создать новую запись", values);
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в UserService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log("вызов в UserService -> Изменить существующую запись", values);
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.user_id}`,
      values
    );
    console.log(
      "вызов в UserService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }
}
