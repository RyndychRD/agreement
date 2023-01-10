const DocumentTypeService = require("../../service/catalogServices/document-type-service");

class DocumentTypeController {
	async getDocuments(req, res, next) {
		try {
			const data = req?.query?.id
				? await DocumentTypeService.getOneDocument(req?.query)
				: await DocumentTypeService.getAllDocuments(req?.query);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
	async createNewDocument(req, res, next) {
		try {
			const data = await DocumentTypeService.createNewDocument(req.body);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
	async updateDocument(req, res, next) {
		try {
			const data = await DocumentTypeService.updateDocument(
				req.query,
				req.body
			);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
	async deleteDocument(req, res, next) {
		try {
			console.log("LOOK here", req.query);
			const data = await DocumentTypeService.deleteDocument(req.query);
			return res.json(data);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new DocumentTypeController();
