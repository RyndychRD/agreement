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
}

module.exports = new DocumentTasksController();
