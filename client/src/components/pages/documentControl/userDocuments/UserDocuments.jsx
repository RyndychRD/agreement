import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";
import CreatedDocument from "./createdDocuments/CreatedDocuments";
import ReworkDocument from "./reworkDocuments/ReworkDocuments";
import ApprovedDocuments from "./approvedDocuments/ApprovedDocuments";
import CompletedDocuments from "./completedDocuments/CompletedDocuments";
import RejectedDocument from "./rejectedDocuments/RejectedDocuments";
import RegistrationDocument from "./RegistrationDocuments/RegistrationDocuments";
import ProcessingDocuments from "./processingDocuments/ProcessingDocuments";

/**
 * Содержит список всех подразделов раздела Мои документы
 */
export default function UserDocuments() {
  return (
    <Routes>
      <Route path="/created-documents" element={<CreatedDocument />} />
      <Route path="/rework-documents" element={<ReworkDocument />} />
      <Route path="/approved-documents" element={<ApprovedDocuments />} />
      <Route path="/processing-documents" element={<ProcessingDocuments />} />
      <Route path="/completed-documents" element={<CompletedDocuments />} />
      <Route path="/rejected-documents" element={<RejectedDocument />} />
      {/*  prettier-ignore */}
      <Route path="/registration-documents" element={<RegistrationDocument />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
