const DocumentTypeModels = require("../../models/catalogModels/document-type-models");
const DevTools = require("../DevTools");

class DocumentTypeService {
	async getAllDocuments() {
		const func = DocumentTypeModels.find({});
		return await DevTools.addDelay(func);
	}
	async getOneDocument(query) {
		const func = DocumentTypeModels.findOne({
			filter: {
				id: query.id,
			},
		});
		return await DevTools.addDelay(func);
	}
	async createNewDocument(body) {
		const func = await DocumentTypeModels.create({
			name: body.newDocumentName,
		});
		return await DevTools.addDelay(func);
	}
	async deleteDocument(query) {
		const func = await DocumentTypeModels.deleteOne({
			id: query.id,
		});
		return await DevTools.addDelay(func);
	}
	async updateDocument(query, body) {
		const func = DocumentTypeModels.update(
			{
				id: query.id,
			},
			{
				name: body.newDocumentName,
			}
		);
		return await DevTools.addDelay(func);
	}
}

module.exports = new DocumentTypeService();
