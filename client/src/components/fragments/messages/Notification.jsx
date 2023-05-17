import { notification } from "antd";

/**
 * Открывает нотификацию в правом верхнем углу
 * @returns
 */
export default function openNotification(title, message) {
  notification.open({
    message: title,
    description: message,
  });
}
