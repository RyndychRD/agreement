const { WebSocketServer } = require("ws");
const uuid = require("uuid");

// Все активные подключения
const clients = {};

const startWebSocketServer = (server) => {
  const wsServer = new WebSocketServer({ server });
  console.log(`WebSocket слушает тот же самый порт`);
  // A new client connection request received
  wsServer.on("connection", function (connection) {
    // Generate a unique code for every user
    const userId = uuid();
    console.log(`Recieved a new connection.`);

    // Store the new connection and handle message s
    clients[userId] = connection;
    console.log(`${userId} connected.`);
  });
};

module.exports = { startWebSocketServer };
