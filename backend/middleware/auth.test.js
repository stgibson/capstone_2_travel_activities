require("dotenv").config();
const jwt = require("jsonwebtoken");
const { authenticateJWT, ensureLoggedIn } = require("./auth");
const ExpressError = require("../expressError");

let token;
let next;

beforeEach(() => {
  token = jwt.sign({ username: "testuser" }, process.env.JWT_SECRET);
  next = jest.fn();
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

describe("ensureLoggedIn", () => {
  it("returns next without error if username in res", () => {
    const req = {};
    const res = { locals: { username: "testuser" } };
    ensureLoggedIn(req, res, next);
    expect(next.mock.calls.length).toEqual(1);
    expect(next.mock.calls[0].length).toEqual(0);
  });

  it("returns next with error if username not in res", () => {
    const req = {};
    const res = { locals: {} };
    ensureLoggedIn(req, res, next);
    expect(next.mock.calls.length).toEqual(1);
    expect(next.mock.calls[0].length).toEqual(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(ExpressError); // Learned how to use toBeInstanceOf at https://stackoverflow.com/questions/62564800/how-to-assert-data-type-with-jest
  });
});