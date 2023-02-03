import { api } from "../../../../http/index";
import { userNameMask } from "../../../CommonFunctions";

export default class DocumentTasksService {
  static API_ROUTE = "/document-tasks";

  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        document_task_id: el.id,
        document_task_problem: el.problem,
        document_task_status: el.document_task_status_name,
        document_task_created_at: el.created_at,
        document_task_due_at: el.due_at,
        document_task_creator: userNameMask(el.creator),
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getIncomeDocumentTasks({ isAddForeignTables }) {
    console.log(`вызов в DocumentTasksService -> Взять мои поручения`);
    const response = await api.get(
      `${this.API_ROUTE}/my-tasks?isAddForeignTables=${isAddForeignTables}`
    );
    console.log(
      "вызов в DocumentTasksService -> Взять мои поручения -> результат",
      response
    );
    return response.data;
  }
}
