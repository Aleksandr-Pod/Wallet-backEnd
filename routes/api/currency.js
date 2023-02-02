const { currency } = require("../../controllers/currency/currency");
const { auth, ctrlWrapper } = require("../../middlewares");

const router = require("express").Router();

// отримання курсу валют
router.get("/", auth, ctrlWrapper(currency));

module.exports = router;