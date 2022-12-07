const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

//Доступ в БД
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
