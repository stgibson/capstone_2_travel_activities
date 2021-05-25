require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jsonSchema = require("jsonschema");
const ExpressError = require("../expressError");
const { User } = require("../models");
const authSchema = require("../schemas/auth.json");

/**
 * Creates new user provided username and password are provided and username is
 * not taken, otherwise 400 error
 * POST /auth/register: { username, password } => { token }
 */
router.post("/register", async (req, res, next) => {
  const { valid, errors } = jsonSchema.validate(req.body, authSchema);

  if (!valid) {
    const errStacks = [];
    for (let err of errors) {
      errStacks.push(err.stack);
    }
    const err = new ExpressError(errStacks, 400);
    return next(err);
  }
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({
      username,
      password: hashedPassword
    });
    const token =
      jwt.sign({ username: newUser.username, }, process.env.JWT_SECRET);
    res.status(201);
    return res.json({ token });
  }
  catch (err) {
    const expressError = new ExpressError(err.message, 400);
    return next(expressError);
  }
});

/**
 * Given username and password, and if they are valid, send token, otherwise
 * 400 error
 * POST /auth/login: { username, password } => { token }
 */
 router.post("/login", async (req, res, next) => {
  const { valid, errors } = jsonSchema.validate(req.body, authSchema);

  if (!valid) {
    const errStacks = [];
    for (let err of errors) {
      errStacks.push(err.stack);
    }
    const err = new ExpressError(errStacks, 400);
    return next(err);
  }
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(username);
    // validate username and password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token =
      jwt.sign({ username: user.username, }, process.env.JWT_SECRET);
    return res.json({ token });
  }
  catch (err) {
    const expressError = new ExpressError(err.message, 400);
    return next(expressError);
  }
});

module.exports = router;