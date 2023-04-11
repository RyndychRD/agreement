const tokenService = require("../../service/token-service");

class SocketController {
  // По refreshToken мы можем опознать человека
  static addNewConnection(messageJson) {
    const connectionInfo = tokenService.validateRefreshToken(
      messageJson.refreshToken
    );
  }
  static deleteExistingConnection(messageJson) {}
}

module.exports = SocketController;
