const DocumentTypeViewsService = require("../../service/catalogServices/document-type-views-service");

/**
 * `DocumentTypeViewsServiceController` Таблица со всеми отображениями для каждого типа документа
 */
class DocumentTypeViewsServiceController {
	async getElement(req, res, next) {
		try {
			const data = req?.query?.id
				? await DocumentTypeViewsService.getOneDocumentTypeViews(
						req?.query
				  )
				: await DocumentTypeViewsService.getAllDocumentsTypeViews(req?.query);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
	async createNewElement(req, res, next) {
		try {
			const data =
				await DocumentTypeViewsService.createNewDocumentTypeViewsService(
					req.body
				);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
	async updateElement(req, res, next) {
		try {
			const data =
				await DocumentTypeViewsService.updateDocumentTypeViewsService(
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
			const data =
				await DocumentTypeViewsService.deleteDocumentTypeViewsService(
					req.query
				);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new DocumentTypeViewsServiceController();
