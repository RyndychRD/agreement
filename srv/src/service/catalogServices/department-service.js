const DepartmentModels = require("../../models/catalogModels/department-models");
const DevTools = require("../DevTools");

class DepartmentService {
  async getAllDepartments() {
    const func = DepartmentModels.find();
    return await DevTools.addDelay(func);
  }
  async getOneDepartment(query) {
    const func = DepartmentModels.findOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async createNewDepartment(body) {
    const func = DepartmentModels.create({
      name: body.newDepartmentName,
    });
    return await DevTools.addDelay(func);
  }
  async deleteDepartment(query) {
    const func = DepartmentModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }
  async updateDepartment(query, body) {
    const func = DepartmentModels.update(
      {
        id: query.id,
      },
      { name: body.newDepartmentName }
    );
    return await DevTools.addDelay(func);
  }
}

module.exports = new DepartmentService();
