const logModel = require("../../../models/logModel/log-model");
const filesModel = require("../../../models/catalogModels/files-model");
const DocumentModels = require("../../../models/catalogModels/document-models");
const Log = require("../Log");
const archiveLogEventTypesModel = require("../../../models/logModel/archive-log-event-types-model");
const moment = require("moment");
const archiveTypeModels = require("../../../models/catalogModels/archive-type-models");
const documentFileModel = require("../../../models/document/document-file-model");

const logType = "ArchiveLog";
class ArchiveLog extends Log {
  constructor(req) {
    super(req);
    this.log_type = "archive";
    this.isLogDB = true;
    this.message = req.body;
    this.logType = logType;
  }
  async prepareMessage() {
    return new Promise((resolve) =>
      resolve({
        ...this.message,
        user_fio: `${this.user.last_name} ${this.user.first_name} ${this.user?.middle_name}`,
      })
    );
  }

  static async getArchiveLogs() {
    const getLogsPromise = new Promise((resolve) =>
      resolve(logModel.find({ log_type: logType }))
    );
    const getActionTypesPromise = new Promise((resolve) =>
      resolve(archiveLogEventTypesModel.find({}))
    );

    return await Promise.all([getLogsPromise, getActionTypesPromise]).then(
      (values) => {
        const logs = values[0];
        const actionTypes = values[1];
        return logs.map((log) => {
          return {
            id: log.id,
            created_at: log.created_at,
            log_user_fio: log.log_message.user_fio,
            archive_action_type_name: actionTypes.find(
              (el) => el.id === log.log_message.action_type
            ).name,
          };
        });
      }
    );
  }

  static async getArchiveLog(id) {
    const getActionTypePromise = (actionTypeId) =>
      new Promise((resolve) => {
        const result = archiveLogEventTypesModel.findOne({
          id: actionTypeId,
        });
        resolve(result);
      });

    const archiveTypesPromise = (archiveTypes) =>
      new Promise((resolve) => {
        const filter = function () {
          this.whereIn("archive_types.id", archiveTypes);
        };
        const result = archiveTypeModels.find({ filter });
        resolve(result);
      });

    const fileNamePromise = (fileId) =>
      new Promise((resolve) => {
        const file = filesModel.findOne(fileId);
        resolve(file);
      });

    const fileDocumentIdPromise = (fileId) =>
      new Promise((resolve) => {
        const filter = { "files.id": fileId };
        const document_file = documentFileModel.findFile({ filter });
        resolve(document_file);
      });

    const documentNamePromise = (documentId) =>
      new Promise((resolve) => {
        const document = DocumentModels.findOne({
          filter: { id: documentId },
        });
        resolve(document);
      });

    return await new Promise((resolve) => resolve(logModel.find({ id: id })))
      .then(async (logs) => {
        const log = logs[0];
        const promises = [];
        promises.push(
          getActionTypePromise(log.log_message.action_type).then(
            (actionType) => (log.actionType = actionType)
          )
        );
        switch (log.log_message.action_type) {
          case 1:
            promises.push(
              archiveTypesPromise(log.log_message.archiveTypes).then(
                (archiveTypes) => {
                  log.archiveType = archiveTypes
                    .map((el) => el.name)
                    .join(", ");
                }
              )
            );
            log.dateRange = log.log_message.dateRange
              ? `${log.log_message.dateRange.start}-${log.log_message.dateRange.end}`
              : "весь";
            break;
          case 3:
          case 4:
            promises.push(
              fileNamePromise(log.log_message.fileId).then((file) => {
                log.fileName = file.name;
                return file;
              })
            );
            promises.push(
              fileDocumentIdPromise(log.log_message.fileId).then(
                async (document_file) => {
                  await documentNamePromise(document_file.document_id).then(
                    (document) => {
                      log.documentName = document.name;
                    }
                  );
                }
              )
            );
            break;
          case 2:
            promises.push(
              documentNamePromise(log.log_message.documentId).then(
                (document) => {
                  log.documentName = document.name;
                }
              )
            );
            break;
        }
        return Promise.all(promises).then(() => {
          return log;
        });
      })
      .then((log) => {
        const fio = log.log_message.user_fio;
        const ip = log.user_ip;
        const created_at = moment(log.created_at).format("DD.MM.YYYY");
        switch (log.log_message.action_type) {
          case 1:
            log.action = `Пользователь ${fio} с ip ${ip} ${created_at} 
            зашел в архив и выбрал отображение договоров 
            по типу архива ${log.archiveType} за ${log.dateRange} период времени`;
            break;
          case 2:
            log.action = `Пользователь ${fio} с ip ${ip} ${created_at}  
            посмотрел документ ${log.documentName}`;
            break;
          case 3:
          case 4:
            log.action = `Пользователь ${fio} с ip ${ip} ${created_at} 
            в документе ${log.documentName} открыл документ ${log.fileName}`;
            break;
          default:
            log.action = "Неопределенно";
        }
        return {
          user_fio: log.log_message.user_fio,
          action_type_name: log.actionType.name,
          created_at: log.created_at,
          action: log.action,
        };
      })
      .catch((e) => {
        console.log("Ошибка при отображении лога " + e);
      });
  }
}

module.exports = ArchiveLog;
