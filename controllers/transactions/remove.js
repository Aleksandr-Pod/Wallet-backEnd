const { Transaction } = require("../../models/transaction");
const { NotFound } = require("http-errors");
const mongoose = require("mongoose");

const remove = async (req, res) => {
  const { _id } = req.user;
  const { transactionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    throw new NotFound(`Transaction with id=${transactionId} not found`);
  }
  const result = await Transaction.findOneAndRemove({
    owner: _id,
    _id: transactionId,
  });

  if (!result) {
    throw new NotFound(
      `Transaction with id=${transactionId} not found in your collection`
    );
  }

  res.status(204).json({
    status: "success",
    code: 204,
    message: "Transaction deleted",
    data: {
      result,
    },
  });
};

module.exports = remove;
