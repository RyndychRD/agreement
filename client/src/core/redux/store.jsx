import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import DocumentCreation from "./reducers/documentCreationPipelineReducer";
import Notification from "./reducers/DocumentNotificationReducer";
import { departmentsApi } from "./api/Globals/Catalogs/DepartamentApi";
import { usersApi } from "./api/Globals/Catalogs/UserApi";
import { rightsApi } from "./api/Globals/Catalogs/RightApi";
import { positionsApi } from "./api/Globals/Catalogs/PositionsApi";
import { documentsApi } from "./api/DocumentControl/DocumentApi";
import { typesApi } from "./api/Globals/Catalogs/TypeApi";
import { routesApi } from "./api/AdminSettings/Constructor/RouteConstructorApi";
import { documentTypesViewsApi } from "./api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";
import { documentIODictionaryElementApi } from "./api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";
import { documentTasksApi } from "./api/DocumentControl/DocumentTaskApi";
import { FAQsApi } from "./api/Globals/FAQ/FAQApi";
import { archiveTypesApi } from "./api/Globals/Catalogs/ArchiveTypeApi";
import { documentArchivesApi } from "./api/Archive/DocumentArchive";
import { archiveLogsApi } from "./api/AdminSettings/Logs/ArchiveLogApi";

const store = configureStore({
  reducer: {
    session: AuthReducer,
    documentCreation: DocumentCreation,
    notification: Notification,
    departmentsApi: departmentsApi.reducer,
    positionsApi: positionsApi.reducer,
    usersApi: usersApi.reducer,
    rightsApi: rightsApi.reducer,
    documentsApi: documentsApi.reducer,
    typesApi: typesApi.reducer,
    routesApi: routesApi.reducer,
    documentTypesViewsApi: documentTypesViewsApi.reducer,
    documentIODictionaryElementApi: documentIODictionaryElementApi.reducer,
    FAQApi: FAQsApi.reducer,
    archiveTypesApi: archiveTypesApi.reducer,
    documentTasksApi: documentTasksApi.reducer,
    archiveLogsApi: archiveLogsApi.reducer,
    documentArchivesApi: documentArchivesApi.reducer,
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
      .concat(documentTasksApi.middleware)
      .concat(FAQsApi.middleware)
      .concat(archiveTypesApi.middleware)
      .concat(documentArchivesApi.middleware)
      .concat(archiveLogsApi.middleware)
      .concat(documentIODictionaryElementApi.middleware),
});

export default store;
