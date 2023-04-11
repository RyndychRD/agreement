import { getWebSocketUrlByEnv } from "../../services/CommonFunctions";

const url = getWebSocketUrlByEnv();

export default class WSS {
  static instance = undefined;

  constructor() {
    console.log("Вызван конструктор WebSocketSingleton");
    try {
      console.log("Попытка вернуть существующий инстанс");
      if (WSS.instance) {
        console.log("Успешна");
        // eslint-disable-next-line no-constructor-return
        return WSS.instance;
      }
      console.log("Провалено, создаем новый инстанс");

      this.ws = new WebSocket(url);
      this.ws.onopen = () => {
        console.log("WebSocket connected");
      };
      this.ws.onmessage = (message) => {
        console.log("WebSocket message: ", message);
      };
      this.ws.onerror = (error) => {
        console.log("WebSocket error: ", error);
      };
      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        // переподключение
        setTimeout(() => {
          this.ws = new WebSocket(url);
        }, 5000);
      };
      WSS.instance = this;
      // При создании нового подключения отправляем токен referesh для передачи данных от пользователя
      WSS.send();
    } catch (e) {
      console.log("Ошибка при создании WebSocket:", e);
    }
  }

  static async send(data) {
    const wss = new WSS();
    return new Promise((resolve) => {
      const sendMsg = () => {
        if (wss.ws.readyState === WebSocket.OPEN) {
          wss.ws.send(data);
          resolve();
        } else {
          setTimeout(() => {
            sendMsg();
          }, 100);
        }
      };
      sendMsg();
    });
  }

  static async close() {
    WSS.ws?.close();
    console.log("Закрыли соединение по WebSocket");
  }
}
