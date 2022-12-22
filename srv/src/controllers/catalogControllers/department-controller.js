const DepartmentService = require("../../service/catalogServices/department-service");

class DepartmentController {
  async getDepartments(req, res, next) {
    try {
      const departmentData = req.query?.id
        ? await DepartmentService.getOneDepartment(req.query)
        : await DepartmentService.getAllDepartments();
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async createNewDepartment(req, res, next) {
    try {
      const departmentData = await DepartmentService.createNewDepartment(
        req.body
      );
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async updateDepartment(req, res, next) {
    try {
      const departmentData = await DepartmentService.updateDepartment(
        req.query,
        req.body
      );
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async deleteDepartment(req, res, next) {
    try {
      const departmentData = await DepartmentService.deleteDepartment(
        req.query
      );
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DepartmentController();
