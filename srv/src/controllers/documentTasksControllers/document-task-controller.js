const DocumentTasksService = require("../../service/documentTasksService/document-task-service");

class DocumentTasksController {
  async getMyDocumentTasks(req, res, next) {
    try {
      const data = await DocumentTasksService.getMyDocumentTasks(
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
