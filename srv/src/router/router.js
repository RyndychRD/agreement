const express = require("express");
const router = express.Router();
const auth = require("./routs/auth.js");

// middleware that is specific to this router
router.use((req, res, next) => {
	next();
});
router.get("/", (req, res) => {
	res.send("HOME PAGE");
});

router.use("/auth", auth);
module.exports = router;
