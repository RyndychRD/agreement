const FileUpload = require("../FileUpload");

class DocumentFileService {
  async uploadDocumentFileToTemp(req) {
    return FileUpload.multi_upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res
          .status(500)
          .send({
            error: { message: `Multer uploading error: ${err.message}` },
          })
          .end();
        return res;
      } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == "ExtensionError") {
          res
            .status(413)
            .send({ error: { message: err.message } })
            .end();
        } else {
          res
            .status(500)
            .send({
              error: { message: `unknown uploading error: ${err.message}` },
            })
            .end();
        }
        return res;
      }

      // Everything went fine.
      // show file `req.files`
      // show body `req.body`
      return res.status(200).end("Your files uploaded.");
    });
  }
}

module.exports = new DocumentFileService();
