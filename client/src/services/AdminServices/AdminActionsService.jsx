import { api } from "../../http/index";

export default class AdminActionsService {
  static API_ROUTE = "/admin-actions";

  static async notifySiteClose() {
    console.log(
      "вызов в AdminActionsService -> Оповестить пользователей о закрытии сайта"
    );
    const response = await api.get(`${this.API_ROUTE}/notify-site-close`);
    console.log(
      "вызов в AdminActionsService ->  Оповестить пользователей о закрытии сайта -> результат",
      response
    );
    return response.data;
  }
}
