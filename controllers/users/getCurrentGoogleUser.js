const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User, Transaction } = require("../../models");
dotenv.config();

const { SECRET_KEY } = process.env;

const getCurrentGoogleUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const { _id, name, balance } = user;

  const token = jwt.sign({id:_id}, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(_id, { token });
  const lastTransactions = await Transaction.find({owner: _id})
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).send({
    status: "success",
    code: 200,
    message: `Welcome, ${name}!`,
    data: {
      token,
      user: { name, email, balance },
      lastTransactions,
    },
  });
};

module.exports = getCurrentGoogleUser;
