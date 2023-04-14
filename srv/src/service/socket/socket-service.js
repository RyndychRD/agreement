const wsConnections = { documents: [] };

class SocketService {
  static sendSocketMsgByUserId(userId, msg, type = "documents") {
    wsConnections[type]
      .filter((el) => el.userId === userId)
      .forEach((userWs) => {
        userWs.ws.send(JSON.stringify(msg));
      });
  }
}

module.exports = { SocketService, wsConnections };
