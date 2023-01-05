import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";

/**
 * Содержит список всех справочников, а также набивает первоначальные значения для отображения
 */
export default function Signing() {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
