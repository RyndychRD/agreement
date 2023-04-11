const { WebSocket } = require("ws");
const http = require("http");
const express = require("express");

class WSServer {
  static wss = undefined;
  // Все активные подключения
  // Мы определяем для каждого пользователя множество точек подключения, то есть массив. Это мы сделаем для того, чтобы с нескольких вкладок нормально работало
  static clients = {};

  constructor() {
    if (WSServer.wss) {
      return { wss: WSServer.wss, clients: WSServer.clients };
    }
    const app = express();
    const port = process.env.WEBSOCKET_PORT || 5001;
    const server = http.createServer(app);
    WSServer.wss = new WebSocket.Server({ server });
    // A new client connection request received
    WSServer.wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`You sent: ${message}`);
      });
      // this.clients.push(ws);
      ws.send("Welcome to the WebSocket server!");
    });

    server.listen(port, () => {
      console.log(`WebSocketServer слушает порт ${process.env.WEBSOCKET_PORT}`);
    });
  }
}

module.exports = WSServer;
