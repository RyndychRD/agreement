import { api } from "../../http/index";

export default class NotificationService {
  static API_ROUTE = "/notifications";

  static async getUnreadNotifications(isGetNotificationCount) {
    // console.log(
    //   `вызов в NotificationService -> Взять все записи для текущего пользователя`
    // );
    const response = await api.get(
      `${this.API_ROUTE}?isGetNotificationCount=${isGetNotificationCount}`
    );
    // console.log(
    //   `вызов в NotificationService -> Взять все записи для текущего пользователя`,
    //   response
    // );
    return response.data;
  }

  static async readNotifications(props) {
    const { elementId, notificationType } = props;

    if (elementId && notificationType) {
      console.log(
        `вызов в NotificationService -> Прочитать записи для текущего пользователя по документу ${elementId}`
      );
      const response = await api.put(
        `${this.API_ROUTE}/read-notifications?elementId=${elementId}&notificationType=${notificationType}`
      );
      console.log(
        `вызов в NotificationService -> Прочитать записи для текущего пользователя по документу ${elementId} -> результат`,
        response
      );
      return response.data;
    }
    return {};
  }
}
