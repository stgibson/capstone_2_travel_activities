const request = require("supertest");
const app = require("../app");
const { sequelize, City, Country, Activity } = require("../models");

let token;
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

  const res = await request(app).post("/auth/register")
    .send({ username: "test", password: "password" });
  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /activities", () => {
  it("can get all activities in a city if logged in", async () => {
    const city = "Paris";
    const country = "France";
    const res = await request(app)
      .get(`/activities?city=${city}&country=${country}`)
      .set("authorization", `Bearer ${token}`);
    const { activities } = res.body;
    
    expect(res.status).toEqual(200);
    expect(activities.length).toEqual(1);

    const activity = activities[0];
    
    expect(activity.id).toEqual(activityId);
    expect(activity.name).toEqual("Eiffel Tower");
  });

  it("fails to get activities if not logged in", async () => {
    const data = { city: "Paris", country: "France" };
    const res = await request(app).get("/activities").send(data);

    expect(res.status).toEqual(401);
  });
});

describe("GET /activities/:id", () => {
  it("can get details on an activity if logged in", async () => {
    const res = await request(app).get(`/activities/${activityId}`)
      .set("authorization", `Bearer ${token}`);
    const { activity } = res.body;

    expect(res.status).toEqual(200);
    expect(activity.id).toEqual(activityId);
    expect(activity.name).toEqual("Eiffel Tower");
    expect(activity.description).toEqual("It lights up at night");
    expect(activity.rating).toEqual("4.5");
    expect(activity.bookingLink).toEqual("http://signupforeiffeltower.com");
    expect(activity.price).toEqual("300");
    expect(activity.currencyCode).toEqual("EUR");
  });

  it("fails to get details on an activity if not logged in", async () => {
    const res = await request(app).get(`/activities/${activityId}`);

    expect(res.status).toEqual(401);
  })
});

describe("PUT /activities/:id/like", () => {
  it("can like an activity if logged in", async () => {
    const res = await request(app).put(`/activities/${activityId}/like`)
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
  });

  it("fails to like an activity if not logged in", async () => {
    const res = await request(app).put(`/activities/${activityId}/like`);

    expect(res.status).toEqual(401);
  });
});

describe("GET /activities/like", () => {
  it("can get all activities the user likes if logged in", async () => {
    await request(app).put(`/activities/${activityId}/like`)
      .set("authorization", `Bearer ${token}`);
    const res = await request(app).get("/activities/like/all")
      .set("authorization", `Bearer ${token}`);
    const { activities } = res.body;

    expect(res.status).toEqual(200);
    expect(activities.length).toEqual(1);
    
    const activity = activities[0];
    
    expect(activity.id).toEqual(activityId);
    expect(activity.name).toEqual("Eiffel Tower");
  });

  it("fails to get activities the user likes if not logged in", async () => {
    const res = await request(app).get("/activities/like/all");

    expect(res.status).toEqual(401);
  });
});

describe("DELETE /activities/:id/unlike", () => {
  it("can unlike an activity if logged in", async () => {
    await request(app).put(`/activities/${activityId}/like`)
      .set("authorization", `Bearer ${token}`);
    const res1 = await request(app).delete(`/activities/${activityId}/unlike`)
      .set("authorization", `Bearer ${token}`);
    
    expect(res1.status).toEqual(200);

    const res2 = await request(app).get("/activities/like/all")
      .set("authorization", `Bearer ${token}`);

    expect(res2.body.activities.length).toEqual(0);
  });

  it("fails to get details on an activity if not logged in", async () => {
    const res = await request(app).delete(`/activities/${activityId}/unlike`);

    expect(res.status).toEqual(401);
  })
});