const DocumentTypeViewsService = require("../../../service/constructorServices/form/document-type-views-service");

/**
 * `DocumentTypeViewsServiceController` Таблица со всеми отображениями для каждого типа документа
 */
class DocumentTypeViewsController {
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
  async createNewTypeView(req, res, next) {
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
}

module.exports = new DocumentTypeViewsController();
