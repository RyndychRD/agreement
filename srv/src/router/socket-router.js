const SocketController = require("../controllers/socketController/socket-controller");

class SocketRouter {
  static getControllerByMessageAction(message) {
    const messageJson = JSON.parse(message);
    switch (messageJson.action) {
      case "addNewConnection":
        SocketController.addNewConnection(message);
        break;
      case "deleteExistingConnection":
        SocketController.deleteExistingConnection(message);
        break;
      default:
        console.log(
          "ОШИБКА: Не известный тип действия для контроллера:",
          message
        );
        break;
    }
  }
}

module.exports = SocketRouter;
