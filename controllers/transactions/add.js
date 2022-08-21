const { Transaction, User } = require("../../models");
const categories = require("../../assets/categories");

const add = async (req, res) => {
  const { _id, balance } = req.user;
  const { amount, isIncome, date, category } = req.body;
  const month = date.slice(3, 5);
  const year = date.slice(6);
  const newBalance = isIncome ? balance + Number(amount)
    : balance - Number(amount);

  const getColor = () => {
    const res =  categories.expense.find(el => el.name === category);
    return res?.backgroundColor || null;
  }
  const colorCategory = getColor();

  await User.findByIdAndUpdate(_id, { balance: newBalance.toFixed(2) });

  const result = await Transaction.create({
    ...req.body,
    month,
    year,
    colorCategory,
    balance: newBalance.toFixed(2),
    owner: _id,
  });

  res.status(201).json({
    status: "success",
    message: "Transaction added",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
