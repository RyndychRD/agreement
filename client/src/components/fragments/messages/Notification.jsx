import { notification } from "antd";

export default function openNotification(title, message) {
  notification.open({
    message: title,
    description: message,
  });
}
