import { Route, Routes } from "react-router-dom";
import { Error404 } from "../../../fragments/messages/Error";
import RouteConstructor from "./routes/RouteConstructor";

/**
 * Содержит список всех справочников, а также набивает первоначальные значения для отображения
 */
export default function Constructors() {
  return (
    <Routes>
      <Route path="/routes" element={<RouteConstructor />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
