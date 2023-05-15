const wsConnections = { documents: [], main: [] };

class SocketService {
  static async broadcast(msg) {
    let msgStr = JSON.stringify(msg);
    wsConnections.main?.forEach((userWs) => {
      userWs.ws.send(msgStr);
    });
  }

  static sendSocketMsgByUserId(userId, msg, type = "documents") {
    wsConnections[type]
      .filter((el) => el.userId === userId)
      .forEach((userWs) => {
        userWs.ws.send(JSON.stringify(msg));
      });
  }

  static deleteSocketConnection(ws) {
    wsConnections.documents = wsConnections.documents.filter(
      (el) => el.ws._socket?._peername?.port !== ws._socket?._peername?.port
    );
  }
}

module.exports = { SocketService, wsConnections };
