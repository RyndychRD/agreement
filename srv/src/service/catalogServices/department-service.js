const DepartmentModels = require('../../models/catalogModels/department-models')

class DepartmentService {
	async getAllDepartments() {
		const departments = await DepartmentModels.find()
		return departments
	}
	async createNewDepartment(values) {

		const departments = await DepartmentModels.create({
			name:values.newDepartmentName
		})
		return departments
	}
}

module.exports = new DepartmentService()
