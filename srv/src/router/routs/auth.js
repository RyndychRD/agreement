const express = require("express");
const auth = express.Router();
const authController = require("../../controllers/auth/auth");

auth.get("/", (req, res) => {
	res.send(authController.getAuth());
});

module.exports = auth;
