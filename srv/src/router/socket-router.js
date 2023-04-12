const Router = require("express").Router;
const router = new Router();
const expressWs = require("express-ws");
expressWs(router);

router.ws("/echo", (ws, req) => {
  ws.on("message", (msg) => {
    console.log("Receive message " + msg);
    ws.send(msg);
  });

  ws.on("close", () => {
    console.log("WebSocket was closed");
  });
});

module.exports = router;
