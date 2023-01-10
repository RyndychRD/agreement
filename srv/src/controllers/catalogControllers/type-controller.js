const TypeService = require("../../service/catalogServices/type-service");

class TypeController {
  async getTypes(req, res, next) {
    try {
      const data = req?.query?.id
        ? await TypeService.getOneType(req?.query)
        : await TypeService.getAllTypes(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createNewType(req, res, next) {
    try {
      const data = await TypeService.createNewType(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateType(req, res, next) {
    try {
      const data = await TypeService.updateType(req.query, req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteType(req, res, next) {
    try {
      console.log("LOOK here", req.query);
      const data = await TypeService.deleteType(req.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TypeController();
