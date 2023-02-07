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

  static async getDocumentTasksByDocument(query) {
    const func = DocumentTaskModel.getDocumentTasks({
      filter: { document_id: query.documentId },
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
    return await DevTools.addDelay(func);
  }

  static async deleteDocumentTask(query) {
    const func = DocumentTaskModel.delete({
      id: query.id,
    });
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
