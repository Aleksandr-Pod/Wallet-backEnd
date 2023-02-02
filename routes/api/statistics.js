const { statistics: ctrl } = require("../../controllers");
const { auth, ctrlWrapper } = require("../../middlewares");

const router = require("express").Router();

// отримання статистики
router.get("/", auth, ctrlWrapper(ctrl.getStatistics));

module.exports = router;
