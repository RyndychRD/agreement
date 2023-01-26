require("dotenv").config({ path: "../../.env" });
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_TEMP_STORAGE_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const uploadFunc = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) },
  fileFilter: (req, file, cb) => {
    if (JSON.parse(process.env.FILE_ACCEPTED_TYPES).includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error(
        `Only ${process.env.FILE_ACCEPTED_TYPES} format allowed!`
      );
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).single("uploadedFile");

/**
 * Загружает файл в темповый сторадж, отдает процесс загрузки файлов, ошибки валидации
 * Если все хорошо, отдает в response оригинальное название файла и название в темповом хранилище
 * @param {*} req
 * @param {*} res
 */
const uploadFile = (req, res) => {
  uploadFunc(req, res, function (err) {
    //Не проверял правильность обработки ошибок
    if (err instanceof multer.MulterError) {
      res
        .status(500)
        .send({
          error: { message: `Multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
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
      return;
    }

    const response = JSON.stringify({
      originalName: req.file.originalname,
      savedFileName: req.file.filename,
    });
    res.status(200).end(response);
  });
};

module.exports = uploadFile;
