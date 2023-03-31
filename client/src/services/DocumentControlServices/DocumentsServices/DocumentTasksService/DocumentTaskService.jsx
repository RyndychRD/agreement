import { api } from "../../../../http/index";
import { userNameMask } from "../../../CommonFunctions";

export default class DocumentTasksService {
  static API_ROUTE = "/document-tasks";

  static statusSpecialFormatter(el) {
    // Если это от Михеевой поручение, то она должна подтвердить выполнение поручения
    if (
      !el.is_second_page_agreement_from_custom_fields_confirmed &&
      el.document_task_status_id === 2 &&
      el.document_task_type_id === 2
    ) {
      return `${el.document_task_status_name}/ Требуется подтверждение`;
    }
    return el.document_task_status_name;
  }

  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        document_task_id: el.id,
        document_task_problem: el.problem,
        document_task_status: DocumentTasksService.statusSpecialFormatter(el),
        document_task_status_id: el.document_task_status_id,
        document_task_created_at: el.created_at,
        document_task_due_at: el.due_at,
        document_task_creator: userNameMask(el.creator),
        document_task_executor: userNameMask(el.executor),
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

  static async getDocumentTasksByDocumentId({
    isAddForeignTables,
    isConfirmedForSecondPageOnly,
    documentId,
  }) {
    console.log(
      `вызов в DocumentTasksService -> Взять  поручения по документу с ID=${documentId}`
    );
    const response = await api.get(
      `${this.API_ROUTE}/?isAddForeignTables=${isAddForeignTables}&documentId=${documentId}&isConfirmedForSecondPageOnly=${isConfirmedForSecondPageOnly}`
    );
    console.log(
      `вызов в DocumentTasksService -> Взять  поручения по документу с ID=${documentId} -> результат`,
      response
    );
    return response.data;
  }

  static async getDocumentTask({
    isAddForeignTables,
    id,
    isAddDocumentValues,
    isAddDocumentFiles,
  }) {
    console.log(`вызов в DocumentTasksService -> Взять  поручения  с ID=${id}`);
    const response = await api.get(
      `${this.API_ROUTE}/task?isAddForeignTables=${isAddForeignTables}&documentTaskId=${id}&isAddDocumentValues=${isAddDocumentValues}&isAddDocumentFiles=${isAddDocumentFiles}`
    );
    console.log(
      `вызов в DocumentTasksService -> Взять  поручения с ID=${id} -> результат`,
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в DocumentTasksService -> Удалить запись", values);
    const response = await api.delete(
      `${this.API_ROUTE}?id=${values.document_task_id}`
    );
    console.log(
      "вызов в DocumentTasksService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async create(values) {
    console.log("вызов в DocumentTasksService -> Создать новую запись", values);
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в DocumentTasksService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log("вызов в DocumentTasksService -> Обновить запись", values);
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.documentTaskId}`,
      values
    );
    console.log(
      "вызов в DocumentTasksService -> Обновить запись -> результат",
      response
    );
    return response.data;
  }
}
