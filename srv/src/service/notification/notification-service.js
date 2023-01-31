const SigningModel = require("../../models/document/document-signing-model");
const DocumentModel = require("../../models/catalogModels/document-models");
const { getOneUser } = require("../catalogServices/user-service");
const mailService = require("../mail-service");
const { getOneStatus } = require("../catalogServices/document-status-service");
class NotificationService {
  static async notifyDocumentSigning(documentId) {
    const currentSigningStep = await SigningModel.getCurrentDocumentSigningStep(
      documentId
    );
    if (currentSigningStep) {
      const document = await DocumentModel.findOne({
        filter: {
          id: documentId,
        },
      });
      const text = `Документ ${document.name} отправлен к вам на подписание`;
      const title = `Новый документ на подписание`;
      const toId = currentSigningStep?.deputy_signer_id
        ? currentSigningStep.deputy_signer_id
        : currentSigningStep.signer_id;
      const toUser = await getOneUser({ id: toId });
      mailService.sendMail(toUser.email, title, text);
    }
  }

  static async notifyDocumentStatusChanged(documentId, newDocumentStatusId) {
    //Если документ в работе, то значит он вернулся из На доработку и надо отправить сообщение о подписании
    if (newDocumentStatusId == 5) {
      this.notifyDocumentSigning(documentId);
    } else {
      const document = await DocumentModel.findOne({
        filter: { id: documentId },
      });
      const status = await getOneStatus({ id: newDocumentStatusId });
      const title = "Документ поменял статус";
      const text = `Документ ${document.name} получил статус ${status.name}`;
      const toId = document.creator_id;
      const toUser = await getOneUser({ id: toId });
      mailService.sendMail(toUser.email, title, text);
    }
  }
}

module.exports = NotificationService;
