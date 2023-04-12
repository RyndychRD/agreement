const Router = require("express").Router;
const router = new Router();
const expressWs = require("express-ws");
const tokenService = require("../service/token-service");
expressWs(router);

router.ws("/notification", (ws, req) => {
  const accessToken = req?.query?.accessToken;
  const userData = tokenService.validateAccessToken(accessToken);
  ws.on("message", (msg) => {
    console.log("Receive " + msg);
    msg = JSON.parse(msg);
    ws.send(JSON.stringify({ ...msg, userId: userData.id }));
  });

  ws.on("close", () => {
    console.log("WebSocket was closed");
  });

  ws.on("error", console.log);
});

module.exports = router;
