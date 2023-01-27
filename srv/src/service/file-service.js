const { v4: uuidv4 } = require("uuid");
require("dotenv").config({ path: "../../.env" });
const multer = require("multer");
const fs = require("fs");
const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);
const Readable = require("stream").Readable;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_TEMP_STORAGE_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const singleUpload = multer({
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
 * Здесь используется синхронное считывание файла, так как это проще. Будет проблема - будем решать
 * @param {*} param0
 */
const getFile = async (
  { isTempFile, fileUuid, isPDF, isConvertToPdf },
  res
) => {
  const pathToFileStorage = isTempFile
    ? process.env.FILE_TEMP_STORAGE_PATH
    : process.env.FILE_STORAGE_PATH;
  const pathToFile = `${pathToFileStorage}\\${fileUuid}`;

  if (isConvertToPdf && !isPDF) {
    const fileData = await fs.readFileSync(pathToFile);
    const fileDataPdf = await convertAnyFileToPdf(fileData);
    //https://stackoverflow.com/questions/12755997/how-to-create-streams-from-string-in-node-js
    const stream = new Readable();
    stream.push(fileDataPdf);
    stream.push(null);
    stream.pipe(res);
  } else {
    const stream = fs.createReadStream(pathToFile);
    res.set({
      "Content-Disposition": `attachment; filename='${fileUuid}'`,
    });
    stream.pipe(res);
  }
};

const convertAnyFileToPdf = async (data) => {
  const ext = ".pdf";
  const buf = Buffer.from(data);
  // // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  return await libre.convertAsync(buf, ext, undefined);
};

module.exports = { singleUpload, getFile, convertAnyFileToPdf };
