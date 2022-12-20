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
	async deleteDepartment(values) {
		const departments = await DepartmentModels.deleteOne({
			id:values.department_id
		})
		return departments
	}
}

module.exports = new DepartmentService()
