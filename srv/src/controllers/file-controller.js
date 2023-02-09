const { fileUpload, getFile } = require("../service/file-service.js");

class DocumentFileController {
  static uploadFile(req, res) {
    fileUpload(req, res);
  }

  static async getFile(req, res) {
    const { fileId, isForPreview } = req.query;
    await getFile(
      {
        isForPreview: isForPreview === "true",
        fileId,
      },
      res
    );
  }
}

module.exports = DocumentFileController;
