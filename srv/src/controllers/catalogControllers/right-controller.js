const RightService = require("../../service/catalogServices/right-service");

class RightController {
  async getRights(req, res, next) {
    try {
      const data = req?.query?.id
        ? await RightService.getOneRight(req?.query)
        : await RightService.getAllRights(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createNewRight(req, res, next) {
    try {
      const data = await RightService.createNewRight(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateRight(req, res, next) {
    try {
      const data = await RightService.updateRight(req.query, req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteRight(req, res, next) {
    try {
      console.log("LOOK here", req.query);
      const data = await RightService.deleteRight(req.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RightController();
