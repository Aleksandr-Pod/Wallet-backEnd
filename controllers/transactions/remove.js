const { User, Transaction } = require("../../models");
const { NotFound } = require("http-errors");

const remove = async (req, res) => {
  const { _id, balance } = req.user;
  const { transactionId } = req.body;

  const data = {
    owner: _id,
    _id: transactionId
  }
// getting data from deleting transaction
const transactionData = await Transaction.findById(transactionId);

const result = await Transaction.findOneAndRemove(data);
if (!result) {
  throw new NotFound(
    `Transaction id=${transactionId} not found in your collection`
  )
}
  
  // calc userBallance
  const userBalance = balance - transactionData.amount;
  // update userBallance
  await User.findByIdAndUpdate(_id, { balance: userBalance.toFixed(2) });
  
  res.status(204).json({
    status: "success",
    code: 204,
    message: "Transaction deleted",
  });
};

module.exports = remove;
