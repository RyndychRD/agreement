const DocumentNotificationService = require("../../service/notification/document-read-notification-service");

class DocumentNotificationController {
  async getNotificationCount(req, res, next) {
    try {
      const data = await DocumentNotificationService.getNotificationCount(
        req.user.id,
        req?.query
      );
      return res.json(data);
    } catch (e) {
      next(e);
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
