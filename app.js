const express = require("express");
const cors = require("cors");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
// const {User} = require("./models") ;

const usersRouter = require("./routes/api/users");
const transactionsRouter = require("./routes/api/transactions");
const statisticsRouter = require("./routes/api/statistics");
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/statistics", statisticsRouter);

// app.use("/link", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/link.html"));
// });
// app.use("/succes", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/succes.html"));
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  // if (message === "jwt expired") {
  //   await User.findByIdAndUpdate(req.user._id, { token: null });
  // }
  res.status(status).json({ message });
});

module.exports = app;
