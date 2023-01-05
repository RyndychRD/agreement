const DocumentService = require("../../service/catalogServices/document-service");

class DocumentController {
  async getDocuments(req, res, next) {
    try {
      const data = req?.query?.id
        ? await DocumentService.getOneDocument(req?.query)
        : await DocumentService.getAllDocuments(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createNewDocument(req, res, next) {
    try {
      const data = await DocumentService.createNewDocument(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateDocument(req, res, next) {
    try {
      const data = await DocumentService.updateDocument(req.query, req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteDocument(req, res, next) {
    try {
      console.log("LOOK here", req.query);
      const data = await DocumentService.deleteDocument(req.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentController();
