const express = require("express");
const { transactions: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/transaction");
const { ctrlWrapper, validation } = require("../../middlewares");
const { auth } = require("../../middlewares");

const router = express.Router();

// нова транзакція
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));
// останні транзакції
router.get("/", auth, ctrlWrapper(ctrl.getLast));
// отримання категорій
router.get("/categories", ctrlWrapper(ctrl.getCategories));

module.exports = router;
