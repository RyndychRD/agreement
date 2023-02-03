const DocumentTaskModel = require("../../models/documentTaskModels/document-task-model");
const { getOneUser } = require("../catalogServices/user-service");
const DevTools = require("../DevTools");

class DocumentTasksService {
  static async getIncomeDocumentTasks(currentUserId, query) {
    const func = DocumentTaskModel.getDocumentTasks({
      filter: { executor_id: currentUserId },
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
              isAddForeignTables: "true",
            }),
          };
        })
      );
    }
    return documentTasks;
  }
}

module.exports = DocumentTasksService;
