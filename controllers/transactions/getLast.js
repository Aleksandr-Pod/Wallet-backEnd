const { Transaction } = require("../../models/transaction");

const getLast = async (req, res) => {
  const { _id } = req.user;

  const lastTransactions = await Transaction.find({
    owner: _id,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json({
    status: "success",
    message: "Transactions received",
    code: 200,
    data: {
      lastTransactions,
    },
  });
};

module.exports = getLast;
