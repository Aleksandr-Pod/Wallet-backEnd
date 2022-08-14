const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const { googleAuth, googleRedirect } = require("./loginGoogle");
const getCurrentGoogleUser = require("./getCurrentGoogleUser");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  googleAuth,
  googleRedirect,
  getCurrentGoogleUser,
};
