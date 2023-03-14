const moment = require("moment");
const LogModel = require("../../models/logModel/log-model");
const path = require("path");
const fs = require("fs");

const LOG_FILE = "log";
class Log {
  constructor(req) {
    this.logFileName = LOG_FILE + `_${moment().format("YYYY_MM_DD")}.txt`;
    this.userId = req.user.id;
    this.userLogin = req.user.login;
    this.userIp = req.socket.remoteAddress;
    this.isLogFile = false;
    this.isLogDB = false;
    this.logType = "Неопределено";
    this.created_at = moment();
  }

  setLogFile(fileName) {
    this.logFile = fileName;
  }
  async prepareMessage() {
    return new Promise((resolve) => resolve(this.message));
  }

  log() {
    if (!this.message) {
      console.log("Ошибка: не передана посылка для логирования");
    }
    this.prepareMessage().then((message) => {
      this.message = message;
      if (this.isLogFile && this.message) {
        this.logFile();
      }
      if (this.isLogDB && this.message) {
        this.logDB();
      }
    });
    return "Начаты задачи по добавлению лога";
  }

  logDB() {
    LogModel.create({
      user_ip: this.userIp,
      created_at: this.created_at,
      user_id: this.userId,
      log_message: this.message,
      log_type: this.logType,
    });
  }
  logFile() {
    const logsDirectory = path.join(__dirname, "logs");
    const logFilePath = path.join(logsDirectory, this.logFileName);
    const logMessage = `${this.created_at}:${this.logType}:${
      this.userLogin
    }:${JSON.stringify(this.message)}`;

    // Проверяем существование директории логов
    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory);
    }

    // Проверяем существование файла логов
    if (!fs.existsSync(logFilePath)) {
      // Если файл не существует, создаем его и записываем первую строку
      fs.writeFileSync(logFilePath, "Log file created\n");
    }

    // Добавляем новую строку в файл логов
    fs.appendFile(logFilePath, `${logMessage}\n`, (err) => {
      if (err) console.log("Ошибка добавления лога:" + err);
    });
  }
}

module.exports = Log;
