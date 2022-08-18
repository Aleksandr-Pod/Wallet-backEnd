const mongoose = require("mongoose");
const app = require('./app')
require("dotenv").config();
const { DB_HOST, PORT = 3030 } = process.env;
console.log('DB_HOST', DB_HOST);

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, () => {
    console.log("Database connection successful, port:", PORT);
  }))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })