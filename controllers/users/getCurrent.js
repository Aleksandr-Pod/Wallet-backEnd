const mongoose = require('mongoose');
const { User } = require('../../models');
const { Transaction } = require('../../models/transaction');
const { NotFound } = require('http-errors');

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({ user: { name, email } });
};

module.exports = getCurrent;
