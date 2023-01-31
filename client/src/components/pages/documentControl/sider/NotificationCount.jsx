import { Badge } from "antd";
import { useGetUnreadNotificationsByTypeQueryHook } from "../../../../core/redux/api/DocumentControl/NotificationApi";
import SimpleSpinner from "../../../fragments/messages/Spinner";

export default function NotificationCount(props) {
  const { type: notificationType } = props;
  const { data, isLoading, isError } = useGetUnreadNotificationsByTypeQueryHook(
    { notificationType, isGetNotificationCount: true },
    {
      pollingInterval: 500,
    }
  );

  if (isLoading) return <SimpleSpinner />;
  return (
    <sup>
      <Badge count={isError ? 0 : data} />
    </sup>
  );
}
