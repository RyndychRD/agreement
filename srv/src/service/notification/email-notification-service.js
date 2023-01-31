const { getOneUser } = require("../catalogServices/user-service");
const mailService = require("../mail-service");

class EmailNotificationService {
  static async notifyDocumentSigningEmail(document, toId) {
    const text = `Документ ${document.name} отправлен к вам на подписание`;
    const title = `Новый документ на подписание`;
    const toUser = await getOneUser({ id: toId });
    mailService.sendMail(toUser.email, title, text);
  }

  static async notifyDocumentStatusChangedEmail(document, status) {
    const title = "Документ поменял статус";
    const text = `Документ ${document.name} получил статус ${status.name}`;
    const toId = document.creator_id;
    const toUser = await getOneUser({ id: toId });
    mailService.sendMail(toUser.email, title, text);
  }
}

module.exports = EmailNotificationService;
