const documentFilesService = require("../../service/document/document-files-service");
const DocumentService = require("../../service/document/document-service");

class DocumentFilesController {
  async getDocumentFiles(req, res, next) {
    try {
      const data = await documentFilesService.getOneDocumentFiles(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addDocumentFiles(req, res, next) {
    try {
      const data = await DocumentService.createDocumentFiles(
        { documentFiles: req.body },
        req.query.documentId,
        req.user.id
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentFilesController();
