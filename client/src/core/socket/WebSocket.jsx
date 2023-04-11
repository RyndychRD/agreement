import { getWebSocketUrlByEnv } from "../../services/CommonFunctions";

const url = getWebSocketUrlByEnv();
const options = { reconnectInterval: 5000 };

export default class WebSocketSingleton {
  static instance = null;

  constructor() {
    console.log("Вызван конструктор");
    if (WebSocketSingleton.instance) {
      // eslint-disable-next-line no-constructor-return
      return WebSocketSingleton.instance;
    }

    this.ws = new WebSocket(url, options);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      // переподключение
      setTimeout(() => {
        this.ws = new WebSocket(url, options);
      }, 5000);
    };

    WebSocketSingleton.instance = this;
  }

  send(data) {
    this.ws.send(data);
  }

  close() {
    this.ws.close();
  }
}
