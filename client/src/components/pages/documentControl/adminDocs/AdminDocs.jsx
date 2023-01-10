import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";
import AllDocuments from "./allDocs/AllDocuments";

/**
 *  Содержит список всех подразделов раздела Список(Админ)
 */
export default function AdminDocs() {
  return (
    <Routes>
      <Route path="/all-documents" element={<AllDocuments />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
