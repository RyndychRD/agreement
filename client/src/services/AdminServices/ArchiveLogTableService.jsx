import { api } from "../../http/index";

export default class ArchiveLogTableService {
  static API_ROUTE = "/log/archive-log";

  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        log_id: el.id,
        log_user_fio: el.log_user_fio,
        archive_action_type: el.archive_action_type_name,
        log_created_at: el.created_at,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getAll() {
    console.log("вызов в ArchiveLogTableService -> Взять все записи");
    const response = await api.get(`${this.API_ROUTE}`);
    console.log(
      "вызов в ArchiveLogTableService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne({ id }) {
    console.log("вызов в ArchiveLogTableService -> Взять одну записи");
    const response = await api.get(`${this.API_ROUTE}?id=${id}`);
    console.log(
      "вызов в ArchiveLogTableService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }
}
