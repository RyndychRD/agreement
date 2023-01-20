const DocumentTypeViewsService = require("../../../service/constructorServices/form/document-type-views-service");

/**
 * `DocumentTypeViewsServiceController` Таблица со всеми отображениями для каждого типа документа
 */
class DocumentTypeViewsServiceController {
  async getTypeView(req, res, next) {
    try {
      const data = req?.query?.id
        ? await DocumentTypeViewsService.getOneDocumentTypeView(req?.query)
        : await DocumentTypeViewsService.getAllDocumentsTypeViews(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createTypeView(req, res, next) {
    try {
      const data = await DocumentTypeViewsService.createNewDocumentTypeView(
        req.body
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateTypeView(req, res, next) {
    try {
      const data = await DocumentTypeViewsService.updateDocumentTypeView(
        req.query,
        req.body
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteTypeView(req, res, next) {
    try {
      console.log("LOOK here", req.query);
      const data = await DocumentTypeViewsService.deleteDocumentTypeView(
        req.query
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentTypeViewsServiceController();
