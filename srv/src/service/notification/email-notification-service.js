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

  static async notifyDocumentTaskChangedEmail(documentTask, document, status) {
    if (status === 1) {
      const title = "Поручение";
      const text = `На вас создано новое поручение по документу ${document.name}. Задача по поручению: ${documentTask.problem}`;
      const toId = documentTask.executor_id;
      const toUser = await getOneUser({ id: toId });
      mailService.sendMail(toUser.email, title, text);
    }
    if (status === 2) {
      const title = "Поручение";
      const text = `Поручение по документу ${document.name} выполнено. Задача по выполненному поручению: ${documentTask.problem}. Результат выполненного поручения: ${documentTask.result}`;
      const toId = document.creator_id;
      const toUser = await getOneUser({ id: toId });
      mailService.sendMail(toUser.email, title, text);
    }
  }
}

module.exports = EmailNotificationService;
