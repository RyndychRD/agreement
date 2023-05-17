/** @format */

import { Spin } from "antd";
import "./style.css";

/**
 * Стандратный спиннер
 * @returns
 */
export default function SimpleSpinner() {
  return (
    <div className="spinner-div">
      <Spin />
    </div>
  );
}
