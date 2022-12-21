import { Route, Routes } from "react-router-dom";
import Departments from "./departments/Departments";
import Users from "./users/Users";
import Positions from "./positions/Positions";

/**
 * Содержит список всех справочников, а также набивает первоначальные значения для отображения
 */
export default function Catalogs() {
  return (
    <Routes>
      <Route path="/departments" element={<Departments />} />
      <Route path="/users" element={<Users />} />
      <Route path="/positions" element={<Positions />} />
    </Routes>
  );
}
