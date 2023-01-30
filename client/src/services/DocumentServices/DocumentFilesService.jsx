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
}
