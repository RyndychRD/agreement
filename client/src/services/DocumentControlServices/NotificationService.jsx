import { SocketDocument } from "../../core/socket/documentSocket/DocumentSocket";

export default class NotificationService {
  static API_ROUTE = "/notifications";

  static async readNotifications(props) {
    const { elementId, notificationType } = props;

    if (notificationType && elementId && SocketDocument.sendJsonMessage)
      SocketDocument.sendJsonMessage({
        type: "readNotification",
        elementId,
        notificationType,
      });
    return {};
  }
}
