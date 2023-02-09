import { Badge } from "antd";
import { useGetUnreadNotificationsQueryHook } from "../../../../core/redux/api/DocumentControl/NotificationApi";
import SimpleSpinner from "../../../fragments/messages/Spinner";

export default function NotificationCount(props) {
  const { type: notificationType } = props;
  const { data, isLoading, isError } = useGetUnreadNotificationsQueryHook(
    { isGetNotificationCount: true },
    {
      pollingInterval: 1000,
    }
  );

  if (isLoading) return <SimpleSpinner />;
  return (
    <sup>
      <Badge
        count={
          isError
            ? 0
            : data.find((el) => el.notification_type === notificationType).count
        }
      />
    </sup>
  );
}
