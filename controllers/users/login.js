const { User, Transaction } = require("../../models");

const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized("Email or password is wrong");
  }
  const { _id, name, balance } = user;

  const token = jwt.sign({id: _id}, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(_id, { token });

  const allTransactions = await Transaction
  .find({owner: _id})
  .sort({ createdAt: -1 })

  res.status(200).send({
    status: "success",
    code: 200,
    message: `Welcome, ${name}!`,
    token,
    user: { name, email, balance },
    allTransactions,
    totalBalance: balance
  });
};

module.exports = login;
