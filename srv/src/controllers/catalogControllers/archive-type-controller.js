const ArchiveTypeService = require("../../service/catalogServices/archive-type-service");

class ArchiveTypeController {
  async getArchiveTypes(req, res, next) {
    try {
      const data = req?.query?.id
        ? await ArchiveTypeService.getOneArchiveType(req?.query)
        : await ArchiveTypeService.getAllArchiveTypes(req?.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async createNewArchiveType(req, res, next) {
    try {
      const data = await ArchiveTypeService.createNewArchiveType(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async updateArchiveType(req, res, next) {
    try {
      const data = await ArchiveTypeService.updateArchiveType(
        req.query,
        req.body
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async deleteArchiveType(req, res, next) {
    try {
      const data = await ArchiveTypeService.deleteArchiveType(req.query);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArchiveTypeController();
