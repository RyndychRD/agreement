const { singleUpload, getFile } = require("../service/file-service.js");

class DocumentFileController {
  static uploadFile(req, res) {
    singleUpload(req, res, function (err) {
      //Не проверял правильность обработки ошибок
      if (err) {
        res
          .status(500)
          .send({
            error: { message: ` uploading error: ${err.message}` },
          })
          .end();
      }

      const response = JSON.stringify({
        originalName: req.file.originalname,
        savedFileName: req.file.filename,
      });
      res.status(200).end(response);
    });
  }

  static async getFile(req, res) {
    const { isTempFile, fileUuid, isConvertToPdf, isPDF } = req.query;
    await getFile(
      {
        isTempFile,
        fileUuid,
        isConvertToPdf: isConvertToPdf === "true",
        isPDF: isPDF === "true",
      },
      res
    );
  }
}

module.exports = DocumentFileController;
