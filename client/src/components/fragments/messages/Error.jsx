/** @format */

import { Alert } from "antd";
import "./style.css";

/**
 * Стандратная ошибка
 * @returns
 */
export default function SimpleError() {
  return <Alert message="Что-то пошло не так" type="error" />;
}

export function Error404() {
  return <Alert message="Страница не найдена" type="error" />;
}
export function Error403() {
  return <Alert message="Не хватает прав" type="error" />;
}
