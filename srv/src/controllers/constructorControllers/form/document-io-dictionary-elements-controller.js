const DocumentIODictionaryElementsService = require("../../../service/constructorServices/form/document-io-dictionary-elements-service");

/**
 * `DocumentTypeViewsServiceController` Таблица со всеми отображениями для каждого типа документа
 */
class DocumentIODictionaryElementsController {
  async getIODictionaryElement(req, res, next) {
    try {
      const data = req?.query?.id
        ? await DocumentIODictionaryElementsService.getOneDocumentsIODictionaryElement(
            req?.query
          )
        : await DocumentIODictionaryElementsService.getAllDocumentsIODictionaryElements(
            req?.query
          );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentIODictionaryElementsController();
