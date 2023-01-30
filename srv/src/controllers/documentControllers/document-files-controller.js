const documentFilesService = require("../../service/document/document-files-service");

class DocumentFilesController {
  async getDocumentFiles(req, res, next) {
    try {
      const data = await documentFilesService.getOneDocumentFiles(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentFilesController();
