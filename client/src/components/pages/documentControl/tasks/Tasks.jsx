import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";
import IncomeTasks from "./incomeTasks/incomeTasks";

/**
 * Содержит список всех подразделов раздела Задачи
 */
export default function Tasks() {
  return (
    <Routes>
      <Route path="/my_tasks" element={<IncomeTasks />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
