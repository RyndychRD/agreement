import { api } from "../../../http/index";

export default class DocumentStatusService {
  static API_ROUTE = "/catalog/documents/status";

  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        document_status_id: el.id,
        document_status_name: el.name,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async getAll() {
    console.log("вызов в DocumentStatusService -> Взять все записи");
    const response = await api.get(`${this.API_ROUTE}`);
    console.log(
      "вызов в DocumentStatusService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getOne({ id }) {
    console.log("вызов в DocumentStatusService -> Взять одну запись");
    const response = await api.get(`${this.API_ROUTE}?id=${id}`);
    console.log(
      "вызов в DocumentStatusService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в DocumentStatusService -> Удалить запись", values);
    const response = await api.delete(
      `${this.API_ROUTE}?id=${values.document_element_IO_dictionary_id}`
    );
    console.log(
      "вызов в DocumentStatusService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async create(values) {
    console.log(
      "вызов в DocumentStatusService -> Создать новую запись",
      values
    );
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в DocumentStatusService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log(
      "вызов в DocumentStatusService -> Изменить существующую запись",
      values
    );
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.document_element_IO_dictionary_id}`,
      values
    );
    console.log(
      "вызов в DocumentStatusService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }
}
