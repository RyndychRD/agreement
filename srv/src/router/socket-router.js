const Router = require("express").Router;
const router = new Router();
const expressWs = require("express-ws");
const socketAuthFunction = require("../middlewares/socket-middleware");
const {
  NotificationSocketRouter,
} = require("./socket/notification-socket-router");

expressWs(router);

const wsConnections = { notification: {} };

router.ws("/notification", socketAuthFunction, (ws, req) => {
  wsConnections.notification[req.user.id] = ws;

  NotificationSocketRouter(ws, req.user);
});

module.exports = { router, wsConnections };
