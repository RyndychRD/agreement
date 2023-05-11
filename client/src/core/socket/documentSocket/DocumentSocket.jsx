import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { useDispatch } from "react-redux";
import { WsUrlAuthed } from "../../../socket/socket";
import openNotification from "../../../components/fragments/messages/Notification";
import {
  appendNotification,
  readNotification,
  setNotifications,
} from "../../redux/reducers/DocumentNotificationReducer";

export const SocketDocument = {};

export default function DocumentSocket() {
  const dispatch = useDispatch();
  const { sendJsonMessage } = useWebSocket(WsUrlAuthed("documents"), {
    share: true,
    onError: (e) => {
      console.log(`WebSocket Error:`, e);
    },
    onMessage: (msg) => {
      const msgJson = JSON.parse(msg.data);
      // console.log("По сокету принята посылка: ", msgJson);
      switch (msgJson.type) {
        case "setNotifications":
          dispatch(setNotifications(msgJson.notifications));
          break;
        case "successReadNotification":
          dispatch(readNotification(msgJson));
          break;
        case "appendNotification":
          dispatch(appendNotification(msgJson.notification));
          break;
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
