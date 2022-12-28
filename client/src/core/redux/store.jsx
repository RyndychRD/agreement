import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../components/auth/AuthReducer";
import { departmentsApi } from "./api/AdminSettings/Catalogs/DepartamentApi";
import { positionsApi } from "./api/AdminSettings/Catalogs/PositionsApi";
import { usersApi } from "./api/AdminSettings/Catalogs/UserApi";
import { rightsApi } from "./api/AdminSettings/Catalogs/RightApi";

const store = configureStore({
  reducer: {
    session: AuthReducer,
    departmentsApi: departmentsApi.reducer,
    positionsApi: positionsApi.reducer,
    usersApi: usersApi.reducer,
    rightsApi: rightsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware()
      .concat(departmentsApi.middleware)
      .concat(positionsApi.middleware)
      .concat(usersApi.middleware)
      .concat(rightsApi.middleware),
});

export default store;
