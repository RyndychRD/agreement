// const { validationResult } = require("express-validator");
const DepartmentService = require('../../service/catalogServices/department-service')
// const ApiError = require("../../exceptions/api-error");

class DepartmentController {
	async getAllDepartments(req, res, next) {
		try {
			const userData = await DepartmentService.getAllDepartments()
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new DepartmentController()
