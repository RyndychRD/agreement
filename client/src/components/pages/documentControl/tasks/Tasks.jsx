import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";

/**
 * Содержит список всех подразделов раздела Задачи
 */
export default function Tasks() {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
