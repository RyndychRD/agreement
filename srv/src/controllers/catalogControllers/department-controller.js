// const { validationResult } = require("express-validator");
const DepartmentService = require('../../service/catalogServices/department-service')
// const ApiError = require("../../exceptions/api-error");

class DepartmentController {
	async getAllDepartments(req, res, next) {
		try {
			const departmentData = await DepartmentService.getAllDepartments()
			return res.json(departmentData)
		} catch (e) {
			next(e)
		}
	}
	async createNewDepartment(req, res, next) {
		try {
			const departmentData = await DepartmentService.createNewDepartment(req)
			return res.json(departmentData)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new DepartmentController()
