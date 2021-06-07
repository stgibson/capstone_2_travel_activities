const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const ExpressError = require("./expressError");
const { authenticateJWT, ensureLoggedIn } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const activitiesRoutes = require("./routes/activities");
const plansRoutes = require("./routes/plans");

if (process.env.NODE_ENV !== "test") {
  sequelize.sync({ force: true });
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes and auth middleware
app.use(authenticateJWT);
app.use("/auth", authRoutes);
app.use(ensureLoggedIn);
app.use("/activities", activitiesRoutes);
app.use("/plans", plansRoutes);

// not found error
app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (process.env.NODE_ENV !== "test" && err.stack) {
    console.error(err.stack);
  }
  return res.json({ error: err, message: err.message });
});

module.exports = app;