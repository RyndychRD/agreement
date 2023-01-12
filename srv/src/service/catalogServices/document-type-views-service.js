const DocumentTypeViewsModels = require("../../models/catalogModels/document-type-views-models");
const DevTools = require("../DevTools");

class DocumentTypeViewsModelsService {
	async getAllDocumentsTypeViews() {
		const func = DocumentTypeViewsModels.find({});
		return await DevTools.addDelay(func);
	}
	async getOneDocumentTypeViews(query) {
		const func = DocumentTypeViewsModels.findOne({
			filter: {
				id: query.id,
			},
		});

		return await DevTools.addDelay(func);
	}
	async createNewDocumentTypeViewsModels(body) {
		const func = await DocumentTypeViewsModels.create({
			key: body.newKey,
			document_type_id: body.newDocumentTypeId,
			view: body.newView,
			view_print: body.newViewPrint,
		});
		return await DevTools.addDelay(func);
	}
	async deleteDocumentTypeViewsModels(query) {
		const func = await DocumentTypeViewsModels.deleteOne({
			id: query.id,
		});
		return await DevTools.addDelay(func);
	}
	async updateDocumentTypeViewsModels(query, body) {
		const func = DocumentTypeViewsModels.update(
			{
				id: query.id,
			},
			{
				document_type_id: body.newDocumentTypeId,
				view: body.newView,
				view_print: body.newViewPrint,
			}
		);
		return await DevTools.addDelay(func);
	}
}

module.exports = new DocumentTypeViewsModelsService();
