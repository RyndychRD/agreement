import { sendMsgSocketDocument } from "../../core/socket/documentSocket/DocumentSocket";

export default class NotificationService {
  static API_ROUTE = "/notifications";

  static async readNotifications(props) {
    const { elementId, notificationType } = props;

    if (notificationType && elementId && sendMsgSocketDocument.sendJsonMessage)
      sendMsgSocketDocument.sendJsonMessage({
        type: "readNotification",
        elementId,
        notificationType,
      });
    return {};
  }
}
