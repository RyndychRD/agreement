const DocumentValuesService = require("../../service/documentValues/document-values-service");

class DocumentValuesController {
  async getDocumentValues(req, res, next) {
    try {
      const data = await DocumentValuesService.getOneDocumentValues(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentValuesController();
