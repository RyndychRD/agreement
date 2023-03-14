const ArchiveLog = require("../../service/logServices/logTypes/archiveLogs");

class ArchiveLogController {
  async getArchiveLogs(req, res, next) {
    try {
      const data = await DocumentFilesService.getFiles({
        query: req?.query,
      });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addArchiveLog(req, res, next) {
    try {
      const data = new ArchiveLog(req).log();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArchiveLogController();
