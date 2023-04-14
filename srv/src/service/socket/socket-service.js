const wsConnections = { documents: [] };

class SocketService {
  static sendSocketMsgByUserId(userId, msg, type = "documents") {
    wsConnections[type]
      .filter((el) => el.userId === userId)
      .forEach((userWs) => {
        userWs.ws.send(JSON.stringify(msg));
      });
  }

  static deleteSocketConnection(ws) {
    wsConnections.documents = wsConnections.documents.filter(
      (el) => el.ws !== ws
    );
  }
}

module.exports = { SocketService, wsConnections };
