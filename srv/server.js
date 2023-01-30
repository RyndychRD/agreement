//Данные текущего окружения
require("dotenv").config();
//Фреймворк web-приложений для Node.js(Каркас вокруг него всё строиться)
const express = require("express");
//Для без проблемных кросс-доменные запрос
const cors = require("cors");
//Пользуемся для простого парсинга "тела" запроса
const bodyParser = require("body-parser");
//Пользуемся для парсинга cookie без него (req.cookies) недоступен
const cookieParser = require("cookie-parser");
const mainRouter = require("./src/router/router");
const errorMiddleware = require("./src/middlewares/error-middleware");
//Для создания папок подгрузки файлов при старте
const DevTools = require("./src/service/DevTools");

//Инициализация сервера
const app = express();
const port = process.env.PORT;

//Инициализация пакетов для сервера
app.use(bodyParser.json());
//Включаем возможность работы с Cookie
app.use(cookieParser());
//Разрешаем кросс-доменные запросы
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
//Инициализация роутинга
app.use("/api", mainRouter);
//Обработка ошибок
app.use(errorMiddleware);

//Создание папок для временного и постоянного хранения файлов в случае их отсутствия по указанным путям
DevTools.createFolderIfNotExist(process.env.FILE_TEMP_STORAGE_PATH);
DevTools.createFolderIfNotExist(process.env.FILE_STORAGE_PATH);

//Точка входа в приложение (Тут же будем отлавливать ошибки)
const start = async () => {
  try {
    //Прослушиваем ${port}
    app.listen(port, () => {
      console.log(
        `"Zik-Согласование договоров v.2" запущен по адресу http://localhost:${port}`
      );
      console.log(
        `"API доступен по адресу http://localhost:${port}/api/{Метод}`
      );
    });
  } catch (e) {
    //Точка входа для логирование
    console.log(e);
  }
};
//Запуск
start();
