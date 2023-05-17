import { api } from "../../http/index";

const DEFAULT_URL = "/log";
/**
 * Общий класс логирования, который собирает информацию из дочерних классов и отправляет ее на сервер
 */
export default class LogService {
  constructor(url) {
    this.url = DEFAULT_URL + url;
    this.isWriteConsole = process.env.REACT_APP_IS_CONSOLE_WRITE !== "0";
  }

  prepareToSend() {
    delete this.url;
    delete this.isWriteConsole;
    return this;
  }

  checkAttributes() {
    return this;
  }

  checkUrl() {
    if (!this.url || this.url === this.DEFAULT_URL) {
      const errorMessage = {
        code: 404,
        message: "Неизвестен путь для логирования",
      };
      throw errorMessage;
    }
    return this;
  }

  async sendLog() {
    const { url, isWriteConsole } = this;
    this.checkUrl().checkAttributes().prepareToSend();
    if (isWriteConsole) {
      console.log(
        `вызов в ${
          this.constructor.name
        } -> sendLog c параметрами ${JSON.stringify(this)}`
      );
    }
    api
      .post(url, this)
      .then((result) => {
        if (isWriteConsole)
          console.log("вызов в AuthService -> login результат", result);
        this.result = result;
      })
      .catch((error) => {
        const errorMessage = {
          code: 500,
          message: error,
        };
        throw errorMessage;
      });

    return this.result;
  }
}
