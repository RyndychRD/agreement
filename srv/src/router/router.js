const Router = require("express").Router;
const router = new Router();

const authRouter = require("./auth");
const departmentRouter = require("./catalog/departments");
const positionRouter = require("./catalog/positions");
const usersRouter = require("./catalog/users");
const rightsRouter = require("./catalog/rights");
const documentTypeRouter = require("./catalog/documents/types");
const documentTypeViewRouter = require("./catalog/documents/types-views");
const documentStatusRouter = require("./catalog/documents/status");
const documentElementIODictionaryRouter = require("./catalog/documents/document-element-io-dictionary");
const documentRouter = require("./catalog/document");
const routeConstructorRouter = require("./constructor/routes");
const documentSigningRouter = require("./documents/signing/document-signing");

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
//Типы представления документов
router.use("/catalog/documents/types-views", documentTypeViewRouter);
//Типы статусов документов
router.use("/catalog/documents/status", documentStatusRouter);
//Типы элементов форм
// prettier-ignore
router.use("/catalog/documents/document-element-io-dictionary",documentElementIODictionaryRouter);
//Документы
router.use("/catalog/documents", documentRouter);

/** Конструкторы */
//Маршруты
router.use("/constructor/routes", routeConstructorRouter);

/** Подписание документов */
router.use("/document-signing/route", documentSigningRouter);

module.exports = router;
