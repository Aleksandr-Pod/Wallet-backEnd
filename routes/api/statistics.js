const express = require("express");
const { statistics: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");
const { auth } = require("../../middlewares");

const router = express.Router();

// отримання статистики
router.get("/", auth, ctrlWrapper(ctrl.getStatistics));

module.exports = router;
