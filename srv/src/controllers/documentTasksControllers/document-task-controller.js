const DocumentTasksService = require("../../service/documentTasksService/document-task-service");

class DocumentTasksController {
  async getIncomeDocumentTasks(req, res, next) {
    try {
      const data = await DocumentTasksService.getIncomeDocumentTasks(
        req.user.id,
        req?.query
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async getDocumentTasksByDocument(req, res, next) {
    try {
      const data = await DocumentTasksService.getDocumentTasksByDocument(
        req?.query
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
      const data = await DocumentTasksService.deleteDocumentTask(req?.query);
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
