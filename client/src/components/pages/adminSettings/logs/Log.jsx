import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";
import ArchiveLogTable from "./logArchive/ArchiveLogTable";

/**
 * Содержит список всех справочников, а также набивает первоначальные значения для отображения
 */
export default function Log() {
  return (
    <Routes>
      <Route path="/archive" element={<ArchiveLogTable />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
