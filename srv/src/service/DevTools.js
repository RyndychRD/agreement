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
}

module.exports = DevTools;
