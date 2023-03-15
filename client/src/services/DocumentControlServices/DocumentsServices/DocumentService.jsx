import { api } from "../../../http/index";
import { userNameMask } from "../../CommonFunctions";

export default class DocumentService {
  static API_ROUTE = "/documents";

  /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
  static prepareForTable(data) {
    try {
      return data.map((el) => ({
        key: el.id,
        document_id: el.id,
        document_name: el.name,
        document_type: el?.document_type_name,
        document_status: el?.document_status_name,
        document_status_id: el?.document_status_id,
        document_created_at: el.created_at,
        document_updated_at:
          el.updated_at !== el.created_at ? el.updated_at : "",
        document_finished_at: el.finished_at,
        document_creator: userNameMask(el?.creator),
        document_stage:
          el.document_status_id === 5 || el.document_status_id === 7
            ? `${el.last_signed_step + 1}/${el.route_steps_count}`
            : "",
        is_document_able_to_delete:
          el.document_status_id === 5 && el.last_signed_step === 0,
        document_current_signer: userNameMask(el?.current_signer),
        document_remark: el?.remark,
        document_passed_to_archive_at: el?.document_passed_to_archive_at,
        document_archive_type_name: el?.document_archive_type_name,
        document_archive_pass_by: el?.document_archive_pass_by,
      }));
    } catch (e) {
      console.log("Ошибка пред-обработки данных:", e);
      return e;
    }
  }

  static async create(values) {
    console.log("вызов в DocumentService -> Создать новую запись", values);
    const response = await api.post(`${this.API_ROUTE}`, values);
    console.log(
      "вызов в DocumentService -> Создать новую запись -> результат",
      response
    );
    return response.data;
  }

  static async update(values) {
    console.log(
      "вызов в DocumentService -> Изменить существующую запись",
      values
    );
    const response = await api.put(
      `${this.API_ROUTE}?id=${values.document_id}`,
      values
    );
    console.log(
      "вызов в DocumentService -> Изменить существующую запись -> результат",
      response
    );
    return response.data;
  }

  static async setMitvorgAndChangeStatus(values) {
    console.log(
      "вызов в DocumentService -> Установить митворг данные и поменять статус",
      values
    );
    const response = await api.post(
      `${this.API_ROUTE}/set-mitvorg-and-change-status?`,
      values
    );
    console.log(
      "вызов в DocumentService -> Установить митворг данные и поменять статус -> результат",
      response
    );
    return response.data;
  }

  // Если в values передан флаг isAddPassBy, то запишем дату помещения в архив через месяц
  static async setArchiveType(values) {
    console.log("вызов в DocumentService -> Установить тип архива", values);
    const response = await api.post(
      `${this.API_ROUTE}/set-archive-type`,
      values
    );
    console.log(
      "вызов в DocumentService -> Установить тип архива -> результат",
      response
    );
    return response.data;
  }

  static async delete(values) {
    console.log("вызов в DocumentService -> Удалить запись", values);
    const response = await api.delete(
      `${this.API_ROUTE}?id=${values.document_id}`
    );
    console.log(
      "вызов в DocumentService -> Удалить запись -> результат",
      response
    );
    return response.data;
  }

  static async getAll({
    isAddForeignTables,
    status,
    isShowAllDocs,
    isOnlyForSigningDocuments,
    isOnlyMySignedDocuments,
  }) {
    console.log("вызов в DocumentService -> Взять все записи");
    const response = await api.get(
      `${this.API_ROUTE}?isAddForeignTables=${isAddForeignTables}
      &status=${status}
      &isShowAllDocs=${isShowAllDocs}
      &isOnlyForSigningDocuments=${isOnlyForSigningDocuments}
      &isOnlyMySignedDocuments=${isOnlyMySignedDocuments}`
    );
    console.log(
      "вызов в DocumentService -> Взять все записи -> результат",
      response
    );
    return response.data;
  }

  static async getAllForArchive({ archiveTypes, dateRange }) {
    console.log(
      `вызов в DocumentService -> Взять все записи для архива со значениями archiveTypes=${archiveTypes}&dateCreationRange=${dateRange}`
    );
    const response = await api.get(
      `${this.API_ROUTE}/archives?archiveTypes=${archiveTypes}&dateCreationRange=${dateRange}`
    );
    console.log(
      "вызов в DocumentService -> Взять все записи для архива -> результат",
      response
    );
    return response.data;
  }

  static async getOne(props) {
    const { id, isAddDocumentData, isAddForeignTables } = props;
    console.log("вызов в DocumentService -> Взять одну записи");
    const response = await api.get(
      `${this.API_ROUTE}?id=${id}&isAddDocumentData=${isAddDocumentData}&isAddForeignTables=${isAddForeignTables}`
    );
    console.log(
      "вызов в DocumentService -> Взять одну запись -> результат",
      response
    );
    return response.data;
  }
}
