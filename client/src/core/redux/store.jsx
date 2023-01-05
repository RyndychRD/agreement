import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../components/auth/AuthReducer";
import { departmentsApi } from "./api/Globals/Catalogs/DepartamentApi";
import { positionsApi } from "./api/Globals/Catalogs/PositionsApi";
import { usersApi } from "./api/Globals/Catalogs/UserApi";
import { rightsApi } from "./api/Globals/Catalogs/RightApi";
import { documentsApi } from "./api/DocumentControl/Catalog/DocumentApi";

const store = configureStore({
  reducer: {
    session: AuthReducer,
    departmentsApi: departmentsApi.reducer,
    positionsApi: positionsApi.reducer,
    usersApi: usersApi.reducer,
    rightsApi: rightsApi.reducer,
    documentsApi: documentsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware()
      .concat(departmentsApi.middleware)
      .concat(positionsApi.middleware)
      .concat(usersApi.middleware)
      .concat(rightsApi.middleware)
      .concat(documentsApi.middleware),
});

export default store;
