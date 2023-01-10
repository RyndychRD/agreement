import { Route, Routes } from "react-router-dom";
import Departments from "./departments/Departments";
import Users from "./users/Users";
import Positions from "./positions/Positions";
import Rights from "./rights/Rights";
import { Error404 } from "../../../fragments/messages/Error";
import Types from "./types/Types";

/**
 * Содержит список всех справочников, а также набивает первоначальные значения для отображения
 */
export default function Catalogs() {
  return (
    <Routes>
      <Route path="/departments" element={<Departments />} />
      <Route path="/users" element={<Users />} />
      <Route path="/positions" element={<Positions />} />
      <Route path="/rights" element={<Rights />} />
      <Route path="/types" element={<Types />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
