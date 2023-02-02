import { api } from "../../../../http/index";

export default class DocumentTasksService {
  static API_ROUTE = "/tasks";

  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getMyTasks() {
    console.log(`вызов в DocumentTasksService -> Взять мои поручения`);
    const response = await api.get(`${this.API_ROUTE}/my-tasks`);
    console.log(
      "вызов в DocumentTasksService -> Взять мои поручения -> результат",
      response
    );
    return response.data;
  }
}
