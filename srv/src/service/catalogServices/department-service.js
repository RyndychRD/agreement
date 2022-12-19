const DepartmentModels = require('../../models/catalogModels/department-models')

class DepartmentService {
	async getAllDepartments() {
		const departments = await DepartmentModels.find()

		return departments
	}
}

module.exports = new DepartmentService()
