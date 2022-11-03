const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({ user: { name, email } });
};

module.exports = getCurrent;