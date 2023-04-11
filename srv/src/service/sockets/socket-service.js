class SocketService {
  static addNewConnection(userInfo) {
    // Вот как раз на этом месте можно пробежаться по всем пользовательским инстансам
    // и позакрывать их(отправить на перезагрузку) при необходимости, открыв только один новый.
    console.log(userInfo);
  }
  static deleteExistingConnection(connectionInfo) {}
}

module.exports = SocketService;
