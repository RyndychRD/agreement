const DocumentElementIODictionaryService = require("../../service/catalogServices/document-element-IO-dictionary-service");

class DocumentElementIODictionaryController {
  async getElement(req, res, next) {
    try {
      const data = req?.query?.id
        ? await DocumentElementIODictionaryService.getOneDocument(req?.query)
        : await DocumentElementIODictionaryService.getAllDocuments(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createNewElement(req, res, next) {
    try {
      const data = await DocumentElementIODictionaryService.createNewDocument(
        req.body
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateElement(req, res, next) {
    try {
      const data = await DocumentElementIODictionaryService.updateDocument(
        req.query,
        req.body
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteElement(req, res, next) {
    try {
      console.log("LOOK here", req.query);
      const data = await DocumentElementIODictionaryService.deleteDocument(
        req.query
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentElementIODictionaryController();
