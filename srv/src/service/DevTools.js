const fs = require("fs");

class DevTools {
  /**
   * Функция, которая позволяет добавить задержку при необходимости. Чтобы добавить задержку, нужно проставить в .env флаг IS_ADD_DELAY=1 (не является ошибкой сделано в целях отладки если будет не нужна можно выключить флагом в конфигах)
   * @param {*} func
   * @returns
   */
  static async addDelay(func, waitTime = 3000) {
    let result;
    if (process.env.IS_ADD_DELAY !== "0") {
      result = new Promise((resolve) => {
        setTimeout(() => {
          resolve(func);
        }, waitTime);
      });
    } else {
      result = await func;
    }
    return result;
  }

  static createFolderIfNotExist(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  static getFileStoragePaths() {
    let result = {
      mainStorage: "",
      tempStorage: "",
    };
    switch (process.env.NODE_ENV) {
      case "production":
        result["mainStorage"] = process.env.FILE_STORAGE_PATH_PROD;
        result["tempStorage"] = process.env.FILE_TEMP_STORAGE_PATH_PROD;
        break;
      case "testing":
        result["mainStorage"] = process.env.FILE_STORAGE_PATH_TEST;
        result["tempStorage"] = process.env.FILE_TEMP_STORAGE_PATH_TEST;
        break;
      case "development":
      default:
        result["mainStorage"] = process.env.FILE_STORAGE_PATH_DEV;
        result["tempStorage"] = process.env.FILE_TEMP_STORAGE_PATH_DEV;
        break;
    }
    return result;
  }

  static getClientURL() {
    let CLIENT_URL = "";
    switch (process.env.NODE_ENV) {
      case "production":
        CLIENT_URL = process.env.CLIENT_URL_PROD;
        break;
      case "testing":
        CLIENT_URL = process.env.CLIENT_URL_TEST;
        break;
      default:
        console.log("DEFAULT CLIENT URL, NODE_ENV CASE NOT FOUND");
      case "development":
        CLIENT_URL = process.env.CLIENT_URL_DEV;
        break;
    }
    return CLIENT_URL;
  }
}

module.exports = DevTools;
