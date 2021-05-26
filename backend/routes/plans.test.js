const request = require("supertest");
const app = require("../app");
const { sequelize, City, Country, Activity } = require("../models");

let token1;
let token2;
let activityId;

beforeEach(async () => {
  // create test activity and test user
  await sequelize.sync({ force: true });
  const country = await Country.create({ name: "france" });
  const city = await City.create({ name: "paris", countryId: country.id });
  const activity = await Activity.create({
    name: "Eiffel Tower",
    description: "It lights up at night",
    rating: "4.5",
    bookingLink: "http://signupforeiffeltower.com",
    price: "300",
    currencyCode: "EUR",
    cityId: city.id
  });
  activityId = activity.id;

  const res1 = await request(app).post("/auth/register")
    .send({ username: "test1", password: "password" });
  token1 = res1.body.token;
  const res2 = await request(app).post("/auth/register")
    .send({ username: "test2", password: "password" });
  token2 = res2.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /plans", () => {
  it("can create a new travel plan if logged in", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const { plan } = res.body;

    expect(res.status).toEqual(201);
    expect(plan.id).not.toBeNull();
    expect(plan.name).toEqual("Test Plan");
    expect(plan.username).toEqual("test1");
  });

  it("fails to create a new travel plan if not logged in", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res = await request(app).post("/plans").send(data);

    expect(res.status).toEqual(401);
  });
});

describe("GET /plans", () => {
  it("can get all plans currently logged in user has created", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res = await request(app).get("/plans")
      .set("authorization", `Bearer ${token1}`);
    const { plans } = res.body;

    expect(res.status).toEqual(200);
    expect(plans.length).toEqual(1);
    expect(plans[0].id).not.toBeNull();
    expect(plans[0].name).toEqual("Test Plan");
  });

  it("fails to get plans if not logged in", async () => {
    const res = await request(app).get("/plans");

    expect(res.status).toEqual(401);
  });
});

describe("GET /plans/:id", () => {
  it("can get days of plan currently logged in user has created", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);
    const { plan } = res2.body;

    expect(res2.status).toEqual(200);
    expect(plan.id).not.toBeNull();
    expect(plan.name).toEqual("Test Plan");
    
    const { days } = plan;

    expect(days.length).toEqual(2);
  });

  it("fails to get days of plan of other user", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token2}`);

    expect(res2.status).toEqual(401);
  });

  it("fails to get days of plan if not logged in", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`);

    expect(res2.status).toEqual(401);
  });
});