const DocumentStatusesSchema = require("../../models/catalogModels/document-status-model");
const DevTools = require("../DevTools");

class DocumentStatusesService {
	async getAllStatuses() {
		const func = DocumentStatusesSchema.find({});
		return await DevTools.addDelay(func);
	}
	async getOneStatus(query) {
		const func = DocumentStatusesSchema.findOne({
			filter: {
				id: query.id,
			},
		});
		return await DevTools.addDelay(func);
	}
	async createNewStatus(body) {
		const func = await DocumentStatusesSchema.create({
			id: body.newKey,
			name: body.newName			
		});
		return await DevTools.addDelay(func);
	}
	async deleteStatus(query) {
		const func = await DocumentStatusesSchema.deleteOne({
			id: query.id,
		});
		return await DevTools.addDelay(func);
	}
	async updateStatus(query, body) {
		const func = DocumentStatusesSchema.update(
			{
				id: query.id,
			},
			{
				key: body.newKey,
				name: body.newName
			}
		);
		return await DevTools.addDelay(func);
	}
}

module.exports = new DocumentStatusesService();
