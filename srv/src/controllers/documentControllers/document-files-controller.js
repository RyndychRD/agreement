const DocumentFilesService = require("../../service/document/document-files-service");
const DocumentService = require("../../service/document/document-service");

class DocumentFilesController {
  async getDocumentFiles(req, res, next) {
    try {
      const data = await DocumentFilesService.getFiles({
        query: req?.query,
      });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addDocumentFiles(req, res, next) {
    try {
      const data = await DocumentService.createDocumentFiles(
        { documentFileIds: req.body },
        req.query.documentId
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async addFileIdToDocument(req, res, next) {
    try {
      const data = await DocumentFilesService.addFileIdToDocument(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentFilesController();
