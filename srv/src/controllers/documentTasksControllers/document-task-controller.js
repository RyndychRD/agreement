const DocumentTasksService = require("../../service/documentTasksService/document-task-service");

class DocumentTasksController {
  async getIncomeDocumentTasks(req, res, next) {
    try {
      const filter = { executor_id: req.user.id, document_task_status_id: 1 };
      const isAddForeignTables = req?.query.isAddForeignTables === "true";
      const data = await DocumentTasksService.getDocumentTasks(
        filter,
        isAddForeignTables
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async getCompletedDocumentTasks(req, res, next) {
    try {
      const filter = { document_task_status_id: 2 };
      if (req.query.isOnlyMyTasks === "true") {
        filter["executor_id"] = req.user.id ? req.user.id : -1;
      }
      const isAddForeignTables = req.query.isAddForeignTables === "true";
      const data = await DocumentTasksService.getDocumentTasks(
        filter,
        isAddForeignTables
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async getDocumentTasksByDocument(req, res, next) {
    try {
      const data = await DocumentTasksService.getDocumentTasksByDocument(
        req?.query,
        req.user
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async getDocumentTask(req, res, next) {
    try {
      const data = await DocumentTasksService.getDocumentTaskById(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createDocumentTask(req, res, next) {
    try {
      const data = await DocumentTasksService.createDocumentTask(
        req.user.id,
        req?.body
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteDocumentTask(req, res, next) {
    try {
      const data = await DocumentTasksService.deleteDocumentTaskById(
        req?.query.id
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateDocumentTask(req, res, next) {
    try {
      const data = await DocumentTasksService.updateDocumentTask(
        req.query,
        req.body
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentTasksController();
