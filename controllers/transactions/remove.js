const { Transaction } = require("../../models/transaction");
const { NotFound } = require("http-errors");

const remove = async (req, res) => {
  const { _id } = req.user;
  const { transactionId } = req.body;
  console.log(req.body);

  const data = {
    owner: _id,
    _id: transactionId
  }
  // console.log('delete data', data);
  const result = await Transaction.findOneAndRemove(data);
  if (!result) {
    throw new NotFound(
      `Transaction id=${transactionId} not found in your collection`
    );
  }
  res.status(204).json({
    status: "success",
    code: 204,
    message: "Transaction deleted",
  });
};

module.exports = remove;
