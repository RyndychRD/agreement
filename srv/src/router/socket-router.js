const Router = require("express").Router;
const router = new Router();
const expressWs = require("express-ws");
const socketAuthFunction = require("../middlewares/socket-middleware");
const { DocumentsSocketRouter } = require("./socket/documents-socket-router");
const { wsConnections } = require("../service/socket/socket-service");

expressWs(router);

router.ws("/documents", socketAuthFunction, (ws, req) => {
  // На рассылку подписываем только авторизованных
  if (req.user?.id) {
    const newConnection = {
      ws,
      wskey: req.headers["sec-websocket-key"],
      ip: req.ip,
      userId: req.user.id,
    };
    wsConnections.documents.push(newConnection);
  }
  DocumentsSocketRouter(ws, req.user);
});
router.ws("/main", socketAuthFunction, (ws, req) => {
  // На рассылку подписываем только авторизованных
  if (req.user?.id) {
    const newConnection = {
      ws,
      wskey: req.headers["sec-websocket-key"],
      ip: req.ip,
      userId: req.user.id,
    };
    wsConnections.main.push(newConnection);
  }
  DocumentsSocketRouter(ws, req.user);
});

module.exports = { router, wsConnections };
