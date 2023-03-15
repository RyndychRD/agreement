import LogService from "./LogService";

const LOG_URL = "/archive-log";
export default class ArchiveLogService extends LogService {
  constructor() {
    super(LOG_URL);
  }

  logUserRequestDocuments(archiveTypes, dateRange) {
    this.action_type = 1;
    this.archiveTypes = archiveTypes;
    this.dateRange = dateRange;
    this.sendLog();
  }

  logUserOpenDocument(documentId) {
    this.action_type = 2;
    this.documentId = documentId;
    this.sendLog();
  }

  logUserLoadDocumentFile(fileId, isDownload = true) {
    this.action_type = isDownload ? 3 : 4;
    this.fileId = fileId;
    this.sendLog();
  }

  checkAttributes() {
    super.checkAttributes();
    if (this.action_type === 2 && !this.documentId) {
      const errorMessage = {
        code: 403,
        message:
          "Невозможно записать действие пользователя. Неизвестен открытый документ",
      };
      throw errorMessage;
    }
    if (this.action_type === 3 && !this.fileId) {
      const errorMessage = {
        code: 403,
        message:
          "Невозможно записать действие пользователя. Неизвестен открытый файл",
      };
      throw errorMessage;
    }
    return this;
  }
}
