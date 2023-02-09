const DocumentValuesService = require("../../service/document/document-values-service");

class DocumentValuesController {
  async getDocumentValues(req, res, next) {
    try {
      const data = await DocumentValuesService.getValues({
        query: req?.query,
      });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentValuesController();
