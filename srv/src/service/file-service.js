const { v4: uuidv4 } = require("uuid");
require("dotenv").config({ path: "../../.env" });
const multer = require("multer");
const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);
const Readable = require("stream").Readable;
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const DocumentFilesModel = require("../models/document/document-file-model");
const DocumentModels = require("../models/catalogModels/document-models");
const moment = require("moment/moment");

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
  const pathToFile = isTempFile
    ? getDocumentFileTempPath(fileUuid)
    : await getDocumentFilePath({ fileUuid, isFilePathSavedInDB: true });
  try {
    if (isConvertToPdf && !isPDF) {
      const fileData = fs.readFileSync(pathToFile);
      const fileDataPdf = await convertAnyFileToPdf(fileData);
      //https://stackoverflow.com/questions/12755997/how-to-create-streams-from-string-in-node-js
      const stream = new Readable();
      stream.push(fileDataPdf);
      stream.push(null);
      stream.pipe(res);
    } else {
      if (!fs.existsSync(pathToFile)) throw Error;
      const stream = fs.createReadStream(pathToFile);
      res.set({
        "Content-Disposition": `attachment; filename='${fileUuid}'`,
      });
      stream.pipe(res);
    }
  } catch (e) {
    console.log(`Файл по пути ${pathToFile} не найден`);
    res
      .status(404)
      .json({ message: `Файл по пути ${pathToFile} не найден` })
      .end();
  }
};

const convertAnyFileToPdf = async (data) => {
  const ext = ".pdf";
  const buf = Buffer.from(data);
  // // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  return await libre.convertAsync(buf, ext, undefined);
};

//https://ilikekillnerds.com/2020/04/how-to-get-the-hash-of-a-file-in-node-js/
const getFileHash = (path) => {
  const fileBuffer = fs.readFileSync(path);
  const hashSum = crypto.createHash("sha1");
  hashSum.update(fileBuffer);
  const hex = hashSum.digest("base64");
  return hex;
};

const isFileHashChanged = ({ path, hash }) => {
  return getFileHash(path) !== hash;
};

const getDocumentFileDirectoryPath = async (
  { documentId },
  isWithStoragePath = true
) => {
  const document = await DocumentModels.findOne({ filter: { id: documentId } });
  const result = `${moment(document.created_at).format(
    "YYYY-DD-MM"
  )}_${documentId}_d`;

  return isWithStoragePath
    ? path.join(process.env.FILE_STORAGE_PATH, result)
    : result;
};

const getDocumentFilePath = async (
  { documentId = null, fileUuid, fileName = null, isFilePathSavedInDB = false },
  isWithStoragePath = true
) => {
  //Если файл уже сохранен в БД, то у нас есть его путь
  if (!documentId && isFilePathSavedInDB) {
    const file = await DocumentFilesModel.findFile({
      filter: {
        uniq: fileUuid,
      },
    });
    return path.join(process.env.FILE_STORAGE_PATH, file.path);
  }
  //Иначе конструируем его самостоятельно
  if (documentId) {
    const fileNameSplit = fileName.split(".");
    const result = `${fileNameSplit[0]}_${fileUuid}.${fileNameSplit[1]}`;
    return path.join(
      await getDocumentFileDirectoryPath({ documentId }, isWithStoragePath),
      result
    );
  }
  //Если у нас нет сохраненного файла и не передан id документа, то выбрасываем ошибку
  throw Error(
    `Проблема с определением пути до файла. Переданы данные ${JSON.stringify({
      documentId,
      fileUuid,
      isFilePathSavedInDB,
    })}`
  );
};

const getDocumentFileTempPath = (fileUuid) => {
  return path.join(process.env.FILE_TEMP_STORAGE_PATH, fileUuid);
};

module.exports = {
  singleUpload,
  getFile,
  convertAnyFileToPdf,
  getFileHash,
  isFileHashChanged,
  getDocumentFileDirectoryPath,
  getDocumentFilePath,
  getDocumentFileTempPath,
};
