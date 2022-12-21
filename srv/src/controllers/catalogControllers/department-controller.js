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
			const departmentData = await DepartmentService.createNewDepartment(req.body)
			return res.json(departmentData)
		} catch (e) {
			next(e)
		}
	}
	async updateDepartment(req, res, next) {
		try {
			const departmentData = await DepartmentService.updateDepartment(req.body)
			return res.json(departmentData)
		} catch (e) {
			next(e)
		}
	}
	async deleteDepartment(req, res, next) {
		try {
			const departmentData = await DepartmentService.deleteDepartment(req.body)
			return res.json(departmentData)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new DepartmentController()
