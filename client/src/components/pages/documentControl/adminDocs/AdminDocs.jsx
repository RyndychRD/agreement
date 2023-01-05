import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";

/**
 *  Содержит список всех подразделов раздела Список(Админ)
 */
export default function AdminDocs() {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
