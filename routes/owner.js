const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const ownerController = require("../controllers/owners");

router.get("/dashboard", isLoggedIn, wrapAsync(ownerController.dashboard));

module.exports = router;
