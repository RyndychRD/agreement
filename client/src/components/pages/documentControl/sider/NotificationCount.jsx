import { Badge } from "antd";
import { useSelector } from "react-redux";

export default function NotificationCount(props) {
  const { type: notificationType } = props;
  const notifications = useSelector(
    (state) =>
      state.notification.notifications.length > 0
        ? state.notification.notifications.filter(
            (notification) =>
              notification.notification_type === notificationType
          )
        : [],
    (oldValue, newValue) => oldValue === newValue
  );
  const count = notifications.length;
  return (
    <sup>
      <Badge count={count} />
    </sup>
  );
}
