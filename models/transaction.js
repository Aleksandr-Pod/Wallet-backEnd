const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    amount: {
      type: Number,
      require: [true, "Amount is required"],
    },
    isIncome: {
      type: Boolean,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    colorCategory: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    month: {
      type: Number,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: [true, "Comment is required"],
    },
    balance: {
      type: Number,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  amount: Joi.number().min(0.01).max(999999.99).message({
    "any.required": "The amount field must be at least 0.01",
  }),
  isIncome: Joi.bool().required(),
  category: Joi.string().required(),
  date: Joi.string().required(),
  comment: Joi.string().min(1).message({
    "any.required": "The comment field must consist of at least 1 letter",
  }),
});

const Transaction = model("transaction", transactionSchema);

module.exports = { Transaction, joiSchema };
