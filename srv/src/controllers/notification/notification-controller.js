const DocumentNotificationService = require("../../service/notification/notification-is-read-service");

class DocumentNotificationController {
  async getNotificationCount(req, res) {
    try {
      const data = await DocumentNotificationService.getNotificationCount(
        req.user.id,
        req?.query
      );
      return res.json(data);
    } catch (e) {
      console.log("getNotificationCount error", e);
    }
  }

  async readNotifications(req, res, next) {
    try {
      const data = await DocumentNotificationService.readNotifications(
        req.user.id,
        req?.query
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentNotificationController();
