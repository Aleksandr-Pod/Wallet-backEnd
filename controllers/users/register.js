const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use yet`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    email,
    password: hashPassword,
    name,
  });
  res.json({
    status: "success",
    code: 201,
    message: "Success! New user added",
    data: {
      name,
      email,
    },
  });
};

module.exports = register;
