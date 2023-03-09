const { v4: uuidv4 } = require("uuid");
require("dotenv").config({ path: "../../.env" });
const multer = require("multer");
const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);
const Readable = require("stream").Readable;
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const DocumentModels = require("../models/catalogModels/document-models");
const moment = require("moment/moment");
const FilesModel = require("../models/catalogModels/files-model");

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

//Мы загружаем один файл и проверяем что загрузка у нас прошла успешно
const fileUpload = (req, res) => {
  const currentUser = req.user.id;
  singleUpload(req, res, async function (err) {
    //Не проверял правильность обработки ошибок
    if (err) {
      // prettier-ignore
      res.status(500).send({error: { message: ` uploading error: ${err.message}` },}).end();
    }

    const file = {
      name: req.file.originalname,
      type: req.file.mimetype,
      uniq: req.file.filename,
      //Так как это временный файл, то путь его это просто название файла в свопе
      path: req.file.filename,
      uploader_id: currentUser,
      hash: getFileHash(getFileTempPath(req.file.filename)),
      size: req.file.size,
    };
    const newFileId = (await FilesModel.createOneFile({ file }))[0].id;

    const response = JSON.stringify({
      fileId: newFileId,
    });
    res.status(200).end(response);
  });
};

/**
 * Здесь используется синхронное считывание файла, так как это проще. Будет проблема - будем решать
 * @param {*} param0
 */
const getFile = async ({ fileId, isForPreview }, res) => {
  const fileFromDB = await FilesModel.findOne(fileId);

  const pathToFile = fileFromDB.isTemp
    ? getFileTempPath(fileFromDB.path)
    : getFilePath(fileFromDB.path);

  if (isForPreview) {
    if (!fs.existsSync(pathToFile))
      // prettier-ignore
      res.status(404).send({error: { message: `Файл по пути ${pathToFile} не найден` },}).end();

    const fileDataPdf =
      fileFromDB.type === "application/pdf"
        ? fs.readFileSync(pathToFile)
        : await convertAnyFileToPdf(pathToFile);
    //https://stackoverflow.com/questions/12755997/how-to-create-streams-from-string-in-node-js
    const stream = new Readable();
    stream.push(fileDataPdf);
    stream.push(null);
    stream.pipe(res);
  } else {
    if (!fs.existsSync(pathToFile))
      // prettier-ignore
      res.status(404).send({error: { message: `Файл по пути ${pathToFile} не найден` },}).end();

    res.set({
      "Content-Disposition": `attachment; filename='${fileFromDB.uniq}'`,
    });
    const stream = fs.createReadStream(pathToFile);
    stream.pipe(res);
  }
};

const convertAnyFileToPdf = async (pathToFile) => {
  const fileData = fs.readFileSync(pathToFile);
  const ext = ".pdf";
  const buf = Buffer.from(fileData);
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

const createDocumentFilePath = async (
  { documentId = null, fileUuid, fileName = null },
  isWithStoragePath = true
) => {
  //Иначе конструируем его самостоятельно
  const fileNameSplit = fileName.split(".");
  const result = `${fileNameSplit[0]}_${fileUuid}.${fileNameSplit[1]}`;
  return path.join(
    await getDocumentFileDirectoryPath({ documentId }, isWithStoragePath),
    result
  );
};
const createDocumentTaskFilePath = async (
  { documentId = null, fileUuid, fileName = null },
  isWithStoragePath = true
) => {
  //Иначе конструируем его самостоятельно
  const fileNameSplit = fileName.split(".");
  const result = `Поручение_${fileNameSplit[0]}_${fileUuid}.${fileNameSplit[1]}`;
  return path.join(
    await getDocumentFileDirectoryPath({ documentId }, isWithStoragePath),
    result
  );
};

const getFileTempPath = (fileUuid) => {
  return path.join(process.env.FILE_TEMP_STORAGE_PATH, fileUuid);
};
const getFilePath = (fileUuid) => {
  return path.join(process.env.FILE_STORAGE_PATH, fileUuid);
};

module.exports = {
  singleUpload,
  getFile,
  convertAnyFileToPdf,
  getFileHash,
  isFileHashChanged,
  getDocumentFileDirectoryPath,
  createDocumentFilePath,
  getFileTempPath,
  createDocumentTaskFilePath,
  fileUpload,
  getFilePath,
};
