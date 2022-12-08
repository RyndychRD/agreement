const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mainRouter = require("./src/router/router");

//Доступ в БД
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use("/", mainRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
