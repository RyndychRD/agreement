import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";
import ForSigningDocuments from "./forSigningDocuments/ForSigningDocuments";
import MySingedDocuments from "./mySignedDocuments/MySignedDocuments";

/**
 * Содержит список всех подразделов раздела Подписание
 */
export default function Signing() {
  return (
    <Routes>
      <Route path="/documents-for-signing" element={<ForSigningDocuments />} />
      <Route path="/my-signed-documents" element={<MySingedDocuments />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
