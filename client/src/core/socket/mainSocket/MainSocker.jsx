import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { WsUrlAuthed } from "../../../socket/socket";
import openNotification from "../../../components/fragments/messages/Notification";

export const SocketDocument = {};

export default function MainSocket() {
  const { sendJsonMessage } = useWebSocket(WsUrlAuthed("main"), {
    share: true,
    onError: (e) => {
      console.log(`WebSocket Error:`, e);
    },
    onMessage: (msg) => {
      const msgJson = JSON.parse(msg.data);
      // console.log("По сокету принята посылка: ", msgJson);
      switch (msgJson.type) {
        case "notifySiteClose":
          openNotification("Через 15 минут сайт закроется на полчаса");
          break;
        default:
          console.log(
            "Не известный тип для DocumentSocket. Посылка: ",
            msgJson
          );
      }
    },
    // shouldReconnect: () => true,
  });
  if (sendJsonMessage) {
    SocketDocument.sendJsonMessage = sendJsonMessage;
  }
}
