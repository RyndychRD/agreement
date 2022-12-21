import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../components/auth/AuthReducer";
import DepartmentsReducer from "../../components/pages/adminSettings/catalogs/departments/DepartmentsReducer";
import PositionsReducer from "../../components/pages/adminSettings/catalogs/positions/PositionsReducer";

const store = configureStore({
  reducer: {
    session: AuthReducer,
    departments: DepartmentsReducer,
    positions: PositionsReducer,
  },
});

export default store;
