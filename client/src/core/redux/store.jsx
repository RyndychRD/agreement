import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../components/auth/AuthReducer";
import { departmentsApi } from "./api/AdminSettings/Catalogs/DepartamentApi";
import { positionsApi } from "./api/AdminSettings/Catalogs/PositionsApi";

const store = configureStore({
  reducer: {
    session: AuthReducer,
    departmentsApi: departmentsApi.reducer,
    positionsApi: positionsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware()
      .concat(departmentsApi.middleware)
      .concat(positionsApi.middleware),
});

export default store;
