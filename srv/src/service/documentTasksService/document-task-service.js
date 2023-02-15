const DocumentTaskFilesModel = require("../../models/documentTaskModels/document-task-files-model");
const DocumentTaskModel = require("../../models/documentTaskModels/document-task-model");
const { getOneUser } = require("../catalogServices/user-service");
const DevTools = require("../DevTools");
const fs = require("fs");
const {
  getDocumentFileDirectoryPath,
  getFileTempPath,
  createDocumentTaskFilePath,
} = require("../file-service");
const FilesModel = require("../../models/catalogModels/files-model");
const DocumentTasksDocumentValuesModel = require("../../models/documentTaskModels/document_tasks-document_values-model");
const DocumentTasksDocumentFilesModel = require("../../models/documentTaskModels/document_tasks-document_files");
const DocumentValuesService = require("../document/document-values-service");
const DocumentFilesService = require("../document/document-files-service");
const {
  notifyDocumentTaskChanged,
} = require("../notification/notification-service");
const NotificationIsReadModel = require("../../models/notification/notification-is-read-model");

class DocumentTasksService {
  static async getIncomeDocumentTasks(currentUserId, query) {
    const func = DocumentTaskModel.getDocumentTasks({
      filter: { executor_id: currentUserId, document_task_status_id: 1 },
      isAddForeignTables: query.isAddForeignTables === "true",
    });
    let documentTasks = await DevTools.addDelay(func);
    if (query?.isAddForeignTables === "true") {
      documentTasks = await Promise.all(
        documentTasks.map(async (documentTask) => {
          return {
            ...documentTask,
            creator: await getOneUser({
              id: documentTask.creator_id,
            }),
          };
        })
      );
    }
    return documentTasks;
  }

  static async getDocumentTasksByDocument(query, currentUser) {
    const filter = {
      document_id: query.documentId,
      creator_id: currentUser.id,
    };
    console.log(currentUser);
    //Для админа показываем все поручения
    if (currentUser.id === 1) {
      delete filter["creator_id"];
    }
    const func = DocumentTaskModel.getDocumentTasks({
      filter,
      isAddForeignTables: query.isAddForeignTables === "true",
    });
    let documentTasks = await DevTools.addDelay(func);
    if (query?.isAddForeignTables === "true") {
      documentTasks = await Promise.all(
        documentTasks.map(async (documentTask) => {
          return {
            ...documentTask,
            executor: await getOneUser({
              id: documentTask.executor_id,
            }),
          };
        })
      );
    }
    return documentTasks;
  }
  static async getDocumentTaskById(query) {
    const func = DocumentTaskModel.getDocumentTask({
      filter: { "document_tasks.id": query.documentTaskId },
      isAddForeignTables: query.isAddForeignTables === "true",
      isAddDocumentValues: query.isAddDocumentValues === "true",
    });
    let documentTask = await DevTools.addDelay(func);
    if (query?.isAddForeignTables === "true") {
      documentTask = await {
        ...documentTask,
        executor: await getOneUser({
          id: documentTask.executor_id,
        }),
        creator: await getOneUser({
          id: documentTask.creator_id,
        }),
        files: await DocumentTaskFilesModel.findFiles({
          filter: { document_task_id: query.documentTaskId },
        }),
      };
    }
    if (query?.isAddDocumentValues === "true") {
      let documentTaskDocumentValues =
        await DocumentTasksDocumentValuesModel.find({
          filter: { document_task_id: query.documentTaskId },
        });
      if (documentTaskDocumentValues && documentTaskDocumentValues.length > 0) {
        const valuesIds = documentTaskDocumentValues.map(
          (el) => el.document_value_id
        );
        documentTaskDocumentValues = await DocumentValuesService.getValues({
          query: { isGetConnectedTables: "true" },
          filterIn: (builder) =>
            builder.whereIn("document_values.id", valuesIds),
        });
      }
      documentTask = await {
        ...documentTask,
        documentValues: documentTaskDocumentValues,
      };
    }
    if (query?.isAddDocumentFiles === "true") {
      let documentTaskDocumentFiles =
        await DocumentTasksDocumentFilesModel.find({
          filter: { document_task_id: query.documentTaskId },
        });
      if (documentTaskDocumentFiles && documentTaskDocumentFiles.length > 0) {
        const valuesIds = documentTaskDocumentFiles.map((el) => el.file_id);
        documentTaskDocumentFiles = await DocumentFilesService.getFiles({
          query: { isGetConnectedTables: "true" },
          filterIn: (builder) => builder.whereIn("files.id", valuesIds),
        });
      }
      documentTask = await {
        ...documentTask,
        documentFiles: documentTaskDocumentFiles,
      };
    }

    return documentTask;
  }

  static async createDocumentTask(currentUserId, body) {
    const func = DocumentTaskModel.create({
      creator_id: currentUserId,
      executor_id: body.executorId,
      document_id: body.documentId,
      problem: body.problem,
      due_at: body.dueAt,
    });
    const documentTask = await DevTools.addDelay(func);
    if (body?.documentPassedValues && body.documentPassedValues.length > 0) {
      const preparedPassedValues = body.documentPassedValues.map(
        (documentValue) => ({
          document_task_id: documentTask[0].id,
          document_value_id: documentValue,
        })
      );
      DocumentTasksDocumentValuesModel.create(preparedPassedValues);
    }
    if (body?.documentPassedFiles && body.documentPassedFiles.length > 0) {
      const preparedPassedValues = body.documentPassedFiles.map(
        (documentValue) => ({
          document_task_id: documentTask[0].id,
          file_id: documentValue,
        })
      );
      DocumentTasksDocumentFilesModel.create(preparedPassedValues);
    }

    // Создание поручение всегда создает с статусом 1 - Поручено
    notifyDocumentTaskChanged(documentTask[0].id, 1);
    return documentTask;
  }

  static async deleteDocumentTask(query) {
    const func = DocumentTaskModel.delete({
      id: query.id,
    });
    const readNotification = NotificationIsReadModel.readeNotifications({
      filter: {
        element_id: query.id,
        notification_type: "IncomeTask",
      },
    });
    DevTools.addDelay(readNotification);
    return await DevTools.addDelay(func);
  }

  static async updateDocumentTask(query, body) {
    const func = DocumentTaskModel.update(
      {
        id: query.id,
      },
      {
        result: body.result,
        document_task_status_id: body.documentTaskStatusId,
        finished_at: "now",
        updated_at: "now",
      }
    );

    const updatedDocumentTasksDocumentId = await func;
    await DocumentTasksService.createDocumentTasksFiles(
      body,
      query.id,
      updatedDocumentTasksDocumentId[0].document_id
    );

    // Создание поручение всегда создает с статусом 1
    notifyDocumentTaskChanged(query.id, body.documentTaskStatusId);
    return await DevTools.addDelay(updatedDocumentTasksDocumentId);
  }

  static async createDocumentTasksFiles(body, documentTaskId, documentId) {
    if (!body?.documentTaskFileIds || body.documentTaskFileIds.length === 0)
      return null;

    DevTools.createFolderIfNotExist(
      await getDocumentFileDirectoryPath({
        documentId,
      })
    );

    const insertArray = await Promise.all(
      body.documentTaskFileIds.map(async (fileIdToSave) => {
        const file = await FilesModel.findOne(fileIdToSave);
        const tempFilePath = getFileTempPath(file.path);
        const storageFilePath = await createDocumentTaskFilePath({
          documentId,
          fileUuid: file.uniq,
          fileName: file.name,
        });
        // Передвигаем файл в место постоянного хранения. Функция ассинхронна, дожидаться завершения не будет
        // TODO: Сделать нормальную обработку ошибки
        fs.rename(tempFilePath, storageFilePath, function (err) {
          if (err) {
            console.log(err);
          }
        });
        file.isTemp = false;
        file.path = await createDocumentTaskFilePath(
          {
            documentId,
            fileUuid: file.uniq,
            fileName: file.name,
          },
          false
        );
        FilesModel.update({ file });

        return {
          document_task_id: documentTaskId,
          file_id: file.id,
        };
      })
    );

    const func = DocumentTaskFilesModel.create(insertArray);
    return await DevTools.addDelay(func);
  }
}

module.exports = DocumentTasksService;
