const DocumentReadNotificationService = require("../../service/notification/document-read-notification-service");

class DocumentReadNotificationController {
  async getNotificationCount(req, res, next) {
    try {
      const data = await DocumentReadNotificationService.getNotificationCount(
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
      const data = await DocumentReadNotificationService.readNotifications(
        req.user.id,
        req?.query
      );
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DocumentReadNotificationController();
