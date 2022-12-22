/** @format */

import { AAlert } from "../../adapter";
import "./style.css";

export default function SimpleError() {
  return <AAlert message="Что-то пошло не так" type="error" />;
}
