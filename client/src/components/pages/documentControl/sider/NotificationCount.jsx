import { Badge } from "antd";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WsUrlAuthed } from "../../../../socket/socket";
import SimpleSpinner from "../../../fragments/messages/Spinner";

export default function NotificationCount(props) {
  const { type: notificationType } = props;

  const { lastJsonMessage } = useWebSocket(WsUrlAuthed("notification"), {
    share: true,
    onError: (e) => {
      console.log(`WebSocket Error:`, e);
    },
    shouldReconnect: () => true,
  });

  if (!ReadyState.OPEN) return <SimpleSpinner />;
  const count = lastJsonMessage
    ? lastJsonMessage.filter((el) => el.notification_type === notificationType)
        .length
    : 0;
  return (
    <sup>
      <Badge count={count} />
    </sup>
  );
}
