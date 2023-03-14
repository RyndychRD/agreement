const Log = require("../Log");

class ArchiveLog extends Log {
  constructor(req) {
    super(req);
    this.log_type = "archive";
    this.isLogDB = true;
    this.message = req.body;
    this.logType = "ArchiveLog";
  }
}

module.exports = ArchiveLog;
