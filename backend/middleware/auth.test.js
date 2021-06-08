require("dotenv").config();
const { authenticateJWT, ensureLoggedIn } = require("./auth");
const jwt = require("jsonwebtoken");

let token;
const next = jest.fn();

beforeEach(() => {
  token = jwt.sign({ username: "testuser" }, process.env.JWT_SECRET);
});

describe("authenticateJWT", () => {
  it("passes down username of token if provided in headers", () => {
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { locals: {} };
    authenticateJWT(req, res, next);
    expect(res.locals.username).toEqual("testuser");
  });

  it("doesn't pass down username of token if not provided in headers", () => {
    const req = {};
    const res = { locals: {} };
    authenticateJWT(req, res, next);
    expect(res.locals.username).toBeUndefined();
  });
});