import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import DocumentCreation from "./reducers/documentCreationPipelineReducer";
import { departmentsApi } from "./api/Globals/Catalogs/DepartamentApi";
import { usersApi } from "./api/Globals/Catalogs/UserApi";
import { rightsApi } from "./api/Globals/Catalogs/RightApi";
import { positionsApi } from "./api/Globals/Catalogs/PositionsApi";
import { documentsApi } from "./api/DocumentControl/DocumentApi";
import { typesApi } from "./api/Globals/Catalogs/TypeApi";
import { routesApi } from "./api/AdminSettings/Constructor/RouteConstructorApi";
import { documentTypesViewsApi } from "./api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";
import { documentIODictionaryElementApi } from "./api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";
import { notificationsApi } from "./api/DocumentControl/NotificationApi";
import { documentTasksApi } from "./api/DocumentControl/DocumentTaskApi";

const store = configureStore({
  reducer: {
    session: AuthReducer,
    documentCreation: DocumentCreation,
    departmentsApi: departmentsApi.reducer,
    positionsApi: positionsApi.reducer,
    usersApi: usersApi.reducer,
    rightsApi: rightsApi.reducer,
    documentsApi: documentsApi.reducer,
    typesApi: typesApi.reducer,
    routesApi: routesApi.reducer,
    documentTypesViewsApi: documentTypesViewsApi.reducer,
    notificationsApi: notificationsApi.reducer,
    documentIODictionaryElementApi: documentIODictionaryElementApi.reducer,
    documentTasksApi: documentTasksApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware()
      .concat(departmentsApi.middleware)
      .concat(positionsApi.middleware)
      .concat(usersApi.middleware)
      .concat(rightsApi.middleware)
      .concat(documentsApi.middleware)
      .concat(typesApi.middleware)
      .concat(routesApi.middleware)
      .concat(documentTypesViewsApi.middleware)
      .concat(notificationsApi.middleware)
      .concat(documentTasksApi.middleware)
      .concat(documentIODictionaryElementApi.middleware),
});

export default store;
