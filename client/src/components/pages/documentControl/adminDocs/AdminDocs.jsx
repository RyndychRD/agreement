import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";
import AllDocuments from "./allDocs/AllDocuments";
import DeletedDocuments from "./deletedDocuments/DeletedDocuments";

/**
 *  Содержит список всех подразделов раздела Список(Админ)
 */
export default function AdminDocs() {
  return (
    <Routes>
      <Route path="/all-documents" element={<AllDocuments />} />
      <Route path="/deleted-documents" element={<DeletedDocuments />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
