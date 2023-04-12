const SocketService = require("../../service/sockets/socket-service");
const tokenService = require("../../service/token-service");

class SocketController {
  // По refreshToken мы можем опознать человека
  static addNewConnection(messageJson) {
    const userInfo = tokenService.validateRefreshToken(
      messageJson.refreshToken
    );
    SocketService.addNewConnection(userInfo);
  }
  static deleteExistingConnection(messageJson) {}
}

module.exports = SocketController;
