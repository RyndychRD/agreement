import { Badge } from "antd";
import useWebSocket from "react-use-websocket";
import { WsUrlAuthed } from "../../../../socket/socket";
import SimpleSpinner from "../../../fragments/messages/Spinner";

export default function NotificationCount(props) {
  const { type: notificationType } = props;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    WsUrlAuthed("notification"),
    {
      share: true,
      onOpen: () => {
        console.log("WebSocket connection established.");
        sendJsonMessage({ notificationType });
      },
      onClose: () => {
        console.log("WebSocket connection closed.");
      },
      onError: (e) => {
        console.log(`WebSocket Error:`, e);
      },
      // shouldReconnect: () => true,
      filter: (el) => JSON.parse(el.data).notificationType === notificationType,
    }
  );

  console.log("My type ", notificationType, " data ", lastJsonMessage);
  if (!lastJsonMessage) return <SimpleSpinner />;
  return (
    <sup>
      <Badge
        count={
          // isError
          // ? 0
          // : data.find((el) => el.notification_type === notificationType)
          // ?.count
          0
        }
      />
    </sup>
  );
}
