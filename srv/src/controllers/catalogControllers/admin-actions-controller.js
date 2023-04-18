const { SocketService } = require("../../service/socket/socket-service");

class AdminActionsController {
  async notifySiteClose(req, res, next) {
    try {
      SocketService.broadcast({ type: "notifySiteClose" });
      return res.json({ status: "success" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AdminActionsController();
