const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const ExpressError = require("./expressError");
const authRoutes = require("./routes/auth");

if (process.env.NODE_ENV !== "test") {
  sequelize.sync();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use("/auth", authRoutes);

// not found error
app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (process.env.NODE_ENV !== "test") {
    console.error(err.stack);
  }
  return res.json({ error: err, message: err.message });
});

module.exports = app;