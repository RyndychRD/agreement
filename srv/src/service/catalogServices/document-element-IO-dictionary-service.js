const DocumentElementIODictionaryModels = require("../../models/catalogModels/document-element-IO-dictionary-models");
const DevTools = require("../DevTools");

class DocumentElementIODictionaryService {
	async getAllDocuments() {
		const func = DocumentElementIODictionaryModels.find({});
		return await DevTools.addDelay(func);
	}
	async getOneDocument(query) {
		const func = DocumentElementIODictionaryModels.findOne({
			filter: {
				id: query.id,
			},
		});
		return await DevTools.addDelay(func);
	}
	async createNewDocument(body) {
		const func = await DocumentElementIODictionaryModels.create({
			key: body.newKey,
			name: body.newName,
			select_value: body.newSelectValue,
		});
		return await DevTools.addDelay(func);
	}
	async deleteDocument(query) {
		const func = await DocumentElementIODictionaryModels.deleteOne({
			id: query.id,
		});
		return await DevTools.addDelay(func);
	}
	async updateDocument(query, body) {
		const func = DocumentElementIODictionaryModels.update(
			{
				id: query.id,
			},
			{
				key: body.newKey,
				name: body.newName,
				select_value: body.newSelectValue,
			}
		);
		return await DevTools.addDelay(func);
	}
}

module.exports = new DocumentElementIODictionaryService();
