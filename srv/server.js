const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

//Доступ в БД
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
