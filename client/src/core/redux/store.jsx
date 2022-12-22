import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../components/auth/AuthReducer";
import PositionsReducer from "../../components/pages/adminSettings/catalogs/positions/PositionsReducer";
import { departmentsApi } from "./api/AdminSettings/Catalogs/DepartamentApi";

const store = configureStore({
  reducer: {
    session: AuthReducer,
    departmentsApi: departmentsApi.reducer,
    positions: PositionsReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(departmentsApi.middleware),
});

export default store;
