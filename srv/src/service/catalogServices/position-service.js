const PositionModels = require("../../models/catalogModels/position-models")

class PositionService {
   async getAllPositions() {
      const data = await PositionModels.find()
      return data
   }
   // async createNewDepartment(values) {
   // 	const departments = await DepartmentModels.create({
   // 		name:values.newDepartmentName
   // 	})
   // 	return departments
   // }
   // async deleteDepartment(values) {
   // 	const departments = await DepartmentModels.deleteOne({
   // 		id:values.department_id
   // 	})
   // 	return departments
   // }
   // async updateDepartment(values) {
   // 	const departments = await DepartmentModels.update({
   // 		id:values.id
   // 	},{name:values.newDepartmentName})
   // 	return departments
   // }
}

module.exports = new PositionService()
