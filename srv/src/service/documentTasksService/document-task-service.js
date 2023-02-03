const DocumentTaskModel = require("../../models/documentTaskModels/document-task-model");
const { getOneUser } = require("../catalogServices/user-service");
const DevTools = require("../DevTools");

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
    return await DevTools.addDelay(func);
  }
}

module.exports = DocumentTasksService;
