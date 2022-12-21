/** @format */

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../components/auth/AuthReducer";
import DepartmentsReducer from "../../components/pages/adminSettings/catalogs/departments/DepartmentsReducer";

const store = configureStore({
  reducer: {
    session: AuthReducer,
    departments: DepartmentsReducer,
  },
});
export default store;
