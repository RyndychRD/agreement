import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";
import CreatedDocument from "./createdDocuments/CreatedDocuments";

/**
 * Содержит список всех подразделов раздела Мои документы
 */
export default function UserDocuments() {
  return (
    <Routes>
      <Route path="/created-documents" element={<CreatedDocument />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
