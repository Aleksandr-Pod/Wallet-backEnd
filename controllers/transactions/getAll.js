const { Transaction } = require("../../models/transaction");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const lastTransactions = await Transaction.find({
    owner: _id}).sort({ createdAt: -1 })

  res.status(200).json({
    status: "success",
    message: "Transactions received",
    code: 200,
    data: {
      lastTransactions,
    },
  });
};

module.exports = getAll;
