import { api } from "../../http/index";

export default class DocumentFilesService {
  static API_ROUTE = "/documents/files";

  static async getOneDocumentFiles(documentId) {
    console.log(
      `вызов в DocumentFilesService -> Взять записи по одному документу c ID=${documentId}`
    );
    const response = await api.get(
      `${this.API_ROUTE}?documentId=${documentId}`
    );
    console.log(
      "вызов в DocumentFilesService -> Взять записи по одному документу -> результат",
      response
    );
    return response.data;
  }

  static async create({ documentId, documentFiles }) {
    console.log(
      `вызов в DocumentFilesService -> Добавить файлы в документ c ID=${documentId}`
    );
    const response = await api.post(
      `${this.API_ROUTE}?documentId=${documentId}`,
      documentFiles
    );
    console.log(
      `вызов в DocumentFilesService -> Добавить файлы в документ c ID=${documentId} -> результат`,
      response
    );
    return response.data;
  }
}
