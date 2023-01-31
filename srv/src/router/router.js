const Router = require("express").Router;
const router = new Router();

const authRouter = require("./auth-router");
const departmentRouter = require("./catalog/departments-router");
const positionRouter = require("./catalog/positions-router");
const usersRouter = require("./catalog/users-router");
const rightsRouter = require("./catalog/rights-router");
const documentTypeRouter = require("./catalog/document-types-router");
const documentStatusRouter = require("./catalog/document-status-router");
const documentRouter = require("./documents/document-router");
const routeConstructorRouter = require("./constructor/routes-router");
const formConstructorTypeViewRouter = require("./constructor/formConstructor/document-types-views-router");
const formConstructorIODictionaryRouter = require("./constructor/formConstructor/document-io-dictionary-elements-router");
const documentSigningRouter = require("./documents/document-signing-router");
const documentValuesRouter = require("./documents/document-values-router");
const documentFilesRouter = require("./documents/document-files-router");
const notificationRouter = require("./notification/notification-router");
const fileRouter = require("./file-router");

//Авторизация
router.use("/", authRouter);
/** Справочники */
//Департаменты
router.use("/catalog/departments", departmentRouter);
//Должности
router.use("/catalog/positions", positionRouter);
//Пользователи
router.use("/catalog/users", usersRouter);
//Права
router.use("/catalog/rights", rightsRouter);
//Типы документов
router.use("/catalog/documents/types", documentTypeRouter);
//Типы статусов документов
router.use("/catalog/documents/status", documentStatusRouter);

/** Конструкторы */
//Маршруты
router.use("/constructor/routes", routeConstructorRouter);
//Типы представления документов
router.use("/constructor/forms/types-views", formConstructorTypeViewRouter);
//Элементы конструктора
// prettier-ignore
router.use("/constructor/forms/types-io-elements",formConstructorIODictionaryRouter);

/** Документ */
//сами документы
router.use("/documents", documentRouter);
// роуты
router.use("/documents/route", documentSigningRouter);
//Значения документа
router.use("/documents/values", documentValuesRouter);
//Файлы документа
router.use("/documents/files", documentFilesRouter);

/** Загрузка файлов */
router.use("/files", fileRouter);

/** Нотификация о документах */
router.use("/notifications", notificationRouter);

module.exports = router;
