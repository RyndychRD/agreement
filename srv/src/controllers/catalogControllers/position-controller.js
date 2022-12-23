const PositionService = require("../../service/catalogServices/position-service");

class PositionController {
  async getPositions(req, res, next) {
    try {
      const departmentData = req?.query?.id
        ? await PositionService.getOnePosition(req?.query)
        : await PositionService.getAllPositions(req?.query);
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async createNewPosition(req, res, next) {
    try {
      const departmentData = await PositionService.createNewPosition(req.body);
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async updatePosition(req, res, next) {
    try {
      const departmentData = await PositionService.updatePosition(
        req.query,
        req.body
      );
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
  async deletePosition(req, res, next) {
    try {
      const departmentData = await PositionService.deletePosition(req.query);
      return res.json(departmentData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PositionController();
