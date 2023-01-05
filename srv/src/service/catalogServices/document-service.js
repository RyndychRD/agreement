const DocumentModels = require("../../models/catalogModels/document-models");
const DevTools = require("../DevTools");

class DocumentService {
	async getAllDocuments() {
		const func = DocumentModels.find({});
		return await DevTools.addDelay(func);
	}
	async getOneDocument(query) {
		const func = DocumentModels.findOne({
			filter: {
				id: query.id,
			},
		});
		return await DevTools.addDelay(func);
	}
	async createNewDocument(body) {
		const func = await DocumentModels.create({
			name: body.newDocumentName,
		});
		return await DevTools.addDelay(func);
	}
	async deleteDocument(query) {
		const func = await DocumentModels.deleteOne({
			id: query.id,
		});
		return await DevTools.addDelay(func);
	}
	async updateDocument(query, body) {
		const func = DocumentModels.update(
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

module.exports = new DocumentService();
