import { api } from "../../../http/index";

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

  static async create({ documentId, documentFileIds }) {
    console.log(
      `вызов в DocumentFilesService -> Добавить файлы в документ c ID=${documentId}`,
      documentFileIds
    );
    const response = await api.post(
      `${this.API_ROUTE}?documentId=${documentId}`,
      documentFileIds
    );
    console.log(
      `вызов в DocumentFilesService -> Добавить файлы в документ c ID=${documentId} -> результат`,
      response
    );
    return response.data;
  }

  static async pushDocumentTaskFileToDocument({ documentId, fileId }) {
    console.log(
      `вызов в DocumentFilesService -> Добавить файл с ID=${fileId} из поручения в документ c ID=${documentId}`
    );
    const response = await api.post(
      `${this.API_ROUTE}/add-file-id-to-document`,
      { documentId, fileId }
    );
    console.log(
      `вызов в DocumentFilesService ->  Добавить файл с ID=${fileId} из поручения в документ c ID=${documentId}`,
      response
    );
    return response.data;
  }
}
