const PositionModels = require("../../models/catalogModels/position-models");
const DevTools = require("../DevTools");

class PositionService {
  async getAllPositions(query) {
    const func = PositionModels.find();
    return await DevTools.addDelay(func);
  }
  async getOnePosition(query) {
    const func = PositionModels.findOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
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

module.exports = new PositionService();
