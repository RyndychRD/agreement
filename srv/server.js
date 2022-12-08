const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mainRouter = require("./src/router/router");
const cors = require("cors");
const session = require("express-session");

//Доступ в БД
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

//Инициализация сервера
const app = express();
const port = process.env.PORT;

//Инициализация пакетов для сервера
app.use(bodyParser.json());
app.use(cors());

//Инициализация роутинга
app.use("/", mainRouter);

//Запуск сервера на порту
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
