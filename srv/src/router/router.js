const Router = require("express").Router;
const router = new Router();

const authRouter = require("./auth-router");
const departmentRouter = require("./catalog/departments-router");
const positionRouter = require("./catalog/positions-router");
const usersRouter = require("./catalog/users-router");
const rightsRouter = require("./catalog/rights-router");
const documentTypeRouter = require("./catalog/documents/types-router");
const documentStatusRouter = require("./catalog/documents/status-router");
const documentRouter = require("./catalog/document-router");
const routeConstructorRouter = require("./constructor/routes-router");
const formConstructorTypeViewRouter = require("./constructor/formConstructor/document-types-views-router");
const formConstructorIODictionaryRouter = require("./constructor/formConstructor/document-io-dictionary-elements-router");
const documentSigningRouter = require("./documents/signing/document-signing-router");
const documentValuesRouter = require("./documents/values/values-router");

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
//Документы
router.use("/catalog/documents", documentRouter);

/** Конструкторы */
//Маршруты
router.use("/constructor/routes", routeConstructorRouter);
//Типы представления документов
router.use("/constructor/forms/types-views", formConstructorTypeViewRouter);
//Элементы конструктора
// prettier-ignore
router.use("/constructor/forms/types-io-elements",formConstructorIODictionaryRouter);

/** Подписание документов */
router.use("/document-signing/route", documentSigningRouter);

/** Документ */
//Значения документа
router.use("/documents/values", documentValuesRouter);

module.exports = router;
