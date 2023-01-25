require("dotenv").config({ path: "../../.env" });
const multer = require("multer");

class FileUpload {
  static multi_upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, process.env.FILE_STORAGE_PATH);
      },
      filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname +
            "-" +
            Date.now() +
            file.originalname.match(/\..*$/)[0]
        );
      },
    }),
    limits: { fileSize: process.env.MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
      if (JSON.parse(process.env.FILE_ACCEPTED_TYPES).includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
        const err = new Error("Only .png, .jpg and .jpeg format allowed!");
        err.name = "ExtensionError";
        return cb(err);
      }
    },
  }).array("uploadedFiles", process.env.MAX_FILE_COUNT);
}

module.exports = FileUpload;
