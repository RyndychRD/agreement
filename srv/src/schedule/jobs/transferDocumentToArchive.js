const DocumentArchiveModel = require("../../models/document/document-archive-model");
const moment = require("moment");
const DocumentService = require("../../service/document/document-service");
const { DOCUMENT_STATUS_ARCHIVE } = require("../../consts");

async function transferDocumentToArchive() {
  console.log("Запущен перевод документов с Исполнен в Архив");
  const filter = function () {
    const currentDate = moment().format("YYYY-MM-DD 23:59:59");
    this.whereRaw("pass_by < ?", currentDate);
  };
  DocumentArchiveModel.find({ filter })
    .then((result) => {
      result.forEach((document) => {
        console.log(`Переводим документ с ID=${document.document_id} в Архив`);
        DocumentService.changeDocumentStatusObj(
          document.document_id,
          DOCUMENT_STATUS_ARCHIVE
        );
        DocumentArchiveModel.update({
          archive: { passed_at: moment(), pass_by: null },
          filter: { document_id: document.document_id },
        });
      });
      return result;
    })
    .then((result) => {
      if (result.length > 0) {
        console.log(
          "Нужные документы переведены: " +
            result.map((doc) => doc.document_id).join(", ")
        );
      }
    })
    .catch((error) => {
      console.log("Произошли ошибки при переводе документов " + error);
    });
}

module.exports = { transferDocumentToArchive };
