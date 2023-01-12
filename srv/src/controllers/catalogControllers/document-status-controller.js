const DocumentStatusesService = require("../../service/catalogServices/document-status-service");

class DocumentStatusesController {
	async getStatuses(req, res, next) {
		try {
			const data = req?.query?.id
				? await DocumentStatusesService.getOneStatus(req?.query)
				: await DocumentStatusesService.getAllStatuses(req?.query);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
	async createNewStatus(req, res, next) {
		try {
			const data = await DocumentStatusesService.createNewDocument(req.body);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
	async updateStatus(req, res, next) {
		try {
			const data = await DocumentStatusesService.updateDocument(
				req.query,
				req.body
			);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
	async deleteStatus(req, res, next) {
		try {
			console.log("LOOK here", req.query);
			const data = await DocumentStatusesService.deleteDocument(req.query);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new DocumentStatusesController();
