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

describe("PUT /days/:dayId/activities/:activityId", () => {
  it("can add activity to day in logged in user's plan", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);
    const { days } = res2.body.plan;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }

    const res3 = await request(app)
      .put(`/days/${dayId}/activities/${activityId}`)
      .set("authorization", `Bearer ${token1}`);

    expect(res3.status).toEqual(200);
  });

  it("fails to add activity to day in other user's plan", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);;
    const { days } = res2.body.plan;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }

    const res3 = await request(app)
      .put(`/days/${dayId}/activities/${activityId}`)
      .set("authorization", `Bearer ${token2}`);

    expect(res3.status).toEqual(401);
  });

  it("fails to add activity to day if not logged in", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);;
    const { days } = res2.body.plan;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }

    const res3 = await request(app)
      .put(`/days/${dayId}/activities/${activityId}`);

    expect(res3.status).toEqual(401);
  });
});

describe("GET /days/:id", () => {
  it("can get all activities in day in logged in user's plan", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);
    const { days } = res2.body.plan;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }

    await request(app)
      .put(`/days/${dayId}/activities/${activityId}`)
      .set("authorization", `Bearer ${token1}`);
    const res3 = await request(app).get(`/days/${dayId}`)
      .set("authorization", `Bearer ${token1}`);
    const { day } = res3.body;

    expect(res3.status).toEqual(200);
    expect(day.number).toEqual(1);
    expect(day.activities.length).toEqual(1);
    expect(day.activities[0].id).not.toBeNull();
    expect(day.activities[0].name).toEqual("Eiffel Tower");
  });

  it("fails to add activity to day in other user's plan", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);
    const { days } = res2.body.plan;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }

    const res3 = await request(app).get(`/days/${dayId}`)
      .set("authorization", `Bearer ${token2}`);

    expect(res3.status).toEqual(401);
  });

  it("fails to add activity to day if not logged in", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);
    const { days } = res2.body.plan;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }

    const res3 = await request(app).get(`/days/${dayId}`);

    expect(res3.status).toEqual(401);
  });
});

describe("DELETE /days/:dayId/activities/:activityId", () => {
  it("can remove activity from day in logged in user's plan", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);
    let days = res2.body.plan.days;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }
    await request(app)
      .put(`/days/${dayId}/activities/${activityId}`)
      .set("authorization", `Bearer ${token1}`);

    const res3 = await request(app)
      .delete(`/days/${dayId}/activities/${activityId}`)
      .set("authorization", `Bearer ${token1}`);

    expect(res3.status).toEqual(200);

    // verify activity has been deleted
    const res4 = await request(app).get(`/days/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);
    const { day } = res4.body;

    expect(day.activities.length).toEqual(0);
  });

  it("fails to add activity to day in other user's plan", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);;
    const { days } = res2.body.plan;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }

    const res3 = await request(app)
      .delete(`/days/${dayId}/activities/${activityId}`)
      .set("authorization", `Bearer ${token2}`);

    expect(res3.status).toEqual(401);
  });

  it("fails to add activity to day if not logged in", async () => {
    const data = { name: "Test Plan", numOfDays: 2 };
    const res1 = await request(app).post("/plans").send(data)
      .set("authorization", `Bearer ${token1}`);
    const res2 = await request(app).get(`/plans/${res1.body.plan.id}`)
      .set("authorization", `Bearer ${token1}`);;
    const { days } = res2.body.plan;
    let dayId;
    for (let i = 0; i < days.length; i++) {
      if (days[i].number === 1) {
        dayId = days[i].id;
        break;
      }
    }

    const res3 = await request(app)
      .delete(`/days/${dayId}/activities/${activityId}`);

    expect(res3.status).toEqual(401);
  });
});