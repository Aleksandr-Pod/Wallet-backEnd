const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../../models");

dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
  SECRET_KEY,
  FRONTEND_URL,
} = process.env;
if (!GOOGLE_CLIENT_ID) console.log("No GOOGLE CLIENT ID !!!");

exports.googleAuth = async (req, res) => {
  const stringParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringParams}`
  );
};

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const {data} = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {Authorization: `Bearer ${tokenData.data.access_token}`}
  });
  const { given_name: name, email } = data
  
  let user;
  user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name });
  const { _id } = user;
  const payload = {id: user._id};
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(_id, { token });

  res.redirect(`${FRONTEND_URL}/home/google-user?email=${email}`);
};
