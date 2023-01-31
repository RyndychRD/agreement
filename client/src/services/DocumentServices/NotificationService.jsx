import { api } from "../../http/index";

export default class NotificationService {
  static API_ROUTE = "/notifications";

  static async getUnreadNotificationsByType(
    notificationType,
    isGetNotificationCount
  ) {
    // console.log(
    //   `вызов в NotificationService -> Взять все записи для текущего пользователя с типом ${notificationType}`
    // );
    const response = await api.get(
      `${this.API_ROUTE}?notificationType=${notificationType}&isGetNotificationCount=${isGetNotificationCount}`
    );
    // console.log(
    //   `вызов в NotificationService -> Взять все записи для текущего пользователя с типом ${notificationType}-> результат`,
    //   response
    // );
    return response.data;
  }
}
