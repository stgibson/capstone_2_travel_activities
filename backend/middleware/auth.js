require("dotenv").config();
const jwt = require("jsonwebtoken");
const ExpressError = require("../expressError");

/**
 * Attempts to verify JWT token in header of request, if it exists. If it
 * exists and is valid, the username stored in the token is added to req so it
 * can be used for further authorization.
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 * @returns call to next
 */
const authenticateJWT = (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const tokens = req.headers.authorization.split(" ");
      if (tokens.length > 1) {
        const token = tokens[1];
        const { username } = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.username = username;
      }
    }
    return next();
  }
  catch (err) {
    return next();
  }
};

/**
 * Verifies user is logged in. If not, throws error.
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 * @returns call to next
 */
const ensureLoggedIn = (req, res, next) => {
  if (res.locals && res.locals.username) {
    return next();
  }
  const err = new ExpressError("Unauthorized", 401);
  return next(err);
};

module.exports = { authenticateJWT, ensureLoggedIn };