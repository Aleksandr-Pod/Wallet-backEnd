const { Transaction } = require("../../models/transaction");

const getLast = async (req, res) => {
  const { _id } = req.user;
  const {page=1, perPage=5} = req.query;
  const skip = (page - 1)*perPage;

  const lastTransactions = await Transaction.find({
    owner: _id,
  })
    .sort({ createdAt: -1 })
    .skip(+skip)
    .limit(perPage);

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
