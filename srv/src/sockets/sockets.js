const { WebSocket } = require("ws");
const http = require("http");
const express = require("express");

class WSServer {
  wss = null;
  // Все активные подключения
  clients = {};

  constructor() {
    if (this.wss) {
      return this.wss;
    }
    const app = express();
    const port = process.env.WEBSOCKET_PORT || 5001;
    const server = http.createServer(app);
    this.wss = new WebSocket.Server({ server });
    // A new client connection request received
    this.wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`You sent: ${message}`);
      });
      // this.clients.push(ws);
      ws.send("Welcome to the WebSocket server!");
    });

    server.listen(port, () => {
      console.log(`WebSocket слушает порт ${process.env.WEBSOCKET_PORT}`);
    });
  }
}

module.exports = WSServer;
