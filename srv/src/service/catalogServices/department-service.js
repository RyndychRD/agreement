const DepartmentModels = require("../../models/catalogModels/department-models");
const DevTools = require("../DevTools");

class DepartmentService {
  async getAllDepartments(query) {
    const func = DepartmentModels.find({
      isAddRights: query?.isAddRights,
    });
    return await DevTools.addDelay(func);
  }
  async getOneDepartment(query) {
    const func = DepartmentModels.findOne({
      filter: {
        "departments.id": query.id,
      },
      isAddRights: query?.isAddRights,
    });
    return await DevTools.addDelay(func);
  }
  async createNewDepartment(body) {
    const func = DepartmentModels.create({
      department: {
        name: body.newDepartmentName,
      },
      departmentRights: body.rightIds,
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
    const func = DepartmentModels.update({
      filter: {
        id: query.id,
      },
      department: { name: body.newDepartmentName },
      departmentRights: body.rightIds,
    });
    return await DevTools.addDelay(func);
  }
}

module.exports = new DepartmentService();
