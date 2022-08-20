const express = require("express");
const { transactions: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/transaction");
const { ctrlWrapper, validation } = require("../../middlewares");
const { auth } = require("../../middlewares");

const router = express.Router();

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));
router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.delete("/", auth, ctrlWrapper(ctrl.remove));

module.exports = router;
