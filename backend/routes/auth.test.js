const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { sequelize } = require("../models");

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await request(app).post("/auth/register")
    .send({ username: "testuser1", password: "password" });
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /auth/register", () => {
  it("can register", async () => {
    const data = { username: "testuser2", password: "password" };
    const res = await request(app).post("/auth/register").send(data);
    const token = res.body.token;
    
    expect(res.status).toEqual(201);
    expect(jwt.decode(token)).toEqual({
      username: "testuser2",
      iat: expect.any(Number)
    });
  });

  it("fails to register with username that already exists", async () => {
    const data = { username: "testuser1", password: "password" };
    const res = await request(app).post("/auth/register").send(data);

    expect(res.status).toEqual(400);
  });
});

describe("POST /auth/login", () => {
  it("can login", async () => {
    const data = { username: "testuser1", password: "password" };
    const res = await request(app).post("/auth/login").send(data);
    const token = res.body.token;
    
    expect(res.status).toEqual(200);
    expect(jwt.decode(token)).toEqual({
      username: "testuser1",
      iat: expect.any(Number)
    });
  });

  it("fails to login with invalid credentials", async () => {
    let data = { username: "wrong", password: "password" };
    let res = await request(app).post("/auth/login").send(data);
    
    expect(res.status).toEqual(400);

    data = { username: "testuser1", password: "wrong" }
    res = await request(app).post("/auth/login").send(data);
    
    expect(res.status).toEqual(400);
  });
});