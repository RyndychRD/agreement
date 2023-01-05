/** @format */

import { AAlert } from "../../adapter";
import "./style.css";

export default function SimpleError() {
  return <AAlert message="Что-то пошло не так" type="error" />;
}

export function Error404() {
  return <AAlert message="Страница не найдена" type="error" />;
}
export function Error403() {
  return <AAlert message="Не хватает прав" type="error" />;
}
