const DocumentFileService = require("../../service/document/document-file-service");

class DocumentFileController {
  async uploadFile(req, res, next) {
    try {
      res = await DocumentFileService.uploadDocumentFileToTemp(req);
      return res;
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentFileController();
