const DocumentFilesModels = require("../../models/document/document-file-model");
const DevTools = require("../DevTools");
const { isFileHashChanged } = require("../file-service");
const path = require("path");

class DocumentFilesService {
  async getOneDocumentFiles(query) {
    const func = DocumentFilesModels.findFiles({
      filter: {
        document_id: query.documentId,
      },
    });
    const files = await DevTools.addDelay(func);
    //После получения списка файлов проверяем хеш каждого файла
    const result = files.map((file) => {
      const isHashChanged = isFileHashChanged({
        path: path.join(process.env.FILE_STORAGE_PATH, file.path),
        hash: file.hash,
      });
      if (isHashChanged) {
        return { ...file, name: `!!!ФАЙЛ БЫЛ ИЗМЕНЕН!!! ${file.name}` };
      } else {
        return { ...file };
      }
    });
    return result;
  }
}

module.exports = new DocumentFilesService();
