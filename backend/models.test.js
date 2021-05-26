const {
  sequelize,
  User,
  City,
  Country,
  Activity,
  Plan,
  Day,
  UserActivity,
  DayActivity
} = require("./models");

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User", () => {
  it("creates user with valid input", async () => {
    const user = await User.create({ username: "test", password: "password" });

    expect(user.username).toEqual("test");
    expect(user.password).toEqual("password");
  });
});

describe("Country", () => {
  it("creates country with valid input", async () => {
    const country = await Country.create({ name: "France" });

    expect(country.id).not.toBeNull();
    expect(country.name).toEqual("France");
  });
});

describe("City", () => {
  it("creates city with valid input", async () => {
    let country = await Country.create({ name: "France" });
    const city = await City.create({ name: "Paris", countryId: country.id });

    expect(city.id).not.toBeNull();
    expect(city.name).toEqual("Paris");
    
    // check relationship
    country = await city.getCountry();
    const cities = await country.getCities();

    expect(country.name).toEqual("France");
    expect(cities.length).toEqual(1);
    expect(cities[0].name).toEqual("Paris");
  });
});

describe("Activity", () => {
  it("creates activity with valid input", async () => {
    const country = await Country.create({ name: "France" });
    let city = await City.create({ name: "Paris", countryId: country.id });
    const activity = await Activity.create({
      name: "Eiffel Tower",
      description: "It lights up at night",
      rating: "4.5",
      bookingLink: "http://signupforeiffeltower.com",
      price: "300",
      currencyCode: "EUR",
      cityId: city.id
    });

    expect(activity.id).not.toBeNull();
    expect(activity.name).toEqual("Eiffel Tower");
    expect(activity.description).toEqual("It lights up at night");
    expect(activity.rating).toEqual("4.5");
    expect(activity.bookingLink).toEqual("http://signupforeiffeltower.com");
    expect(activity.price).toEqual("300");
    expect(activity.currencyCode).toEqual("EUR");
    
    // check relationship
    city = await activity.getCity();
    const activities = await city.getActivities();

    expect(city.name).toEqual("Paris");
    expect(activities.length).toEqual(1);
    expect(activities[0].name).toEqual("Eiffel Tower");
  });
});

describe("Plans", () => {
  it("creates plan with valid input", async () => {
    let user = await User.create({ username: "test", password: "password" });
    const plan = await Plan.create({
      name: "Test Plan",
      username: user.username
    });
    
    expect(plan.id).not.toBeNull();
    expect(plan.name).toEqual("Test Plan");

    // check relationship
    user = await plan.getUser();
    const plans = await user.getPlans();

    expect(user.username).toEqual("test");
    expect(plans.length).toEqual(1);
    expect(plans[0].name).toEqual("Test Plan");
  });
});

describe("Day", () => {
  it("creates day with valid input", async () => {
    const user = await User.create({ username: "test", password: "password" });
    let plan = await Plan.create({
      name: "Test Plan",
      username: user.username
    });
    const day = await Day.create({ number: 1, planId: plan.id });

    expect(day.id).not.toBeNull();
    expect(day.number).toEqual(1);
    
    plan = await day.getPlan();
    const days = await plan.getDays();

    expect(plan.name).toEqual("Test Plan");
    expect(days.length).toEqual(1);
    expect(days[0].number).toEqual(1);
  });
});

describe("UserActivity", () => {
  it("creates association between a user and an activity", async () => {
    const user = await User.create({ username: "test", password: "password" });
    const country = await Country.create({ name: "France" });
    const city = await City.create({ name: "Paris", countryId: country.id });
    const activity = await Activity.create({
      name: "Eiffel Tower",
      description: "It lights up at night",
      rating: "4.5",
      bookingLink: "http://signupforeiffeltower.com",
      price: "300",
      currencyCode: "EUR",
      cityId: city.id
    });
    await UserActivity.create({ username: user.username, activityId: activity.id });
    const activities = await user.getActivities();
    const users = await activity.getUsers();

    expect(activities.length).toEqual(1);
    expect(activities[0].name).toEqual("Eiffel Tower");
    expect(users.length).toEqual(1);
    expect(users[0].username).toEqual("test");
  });
});

describe("DayActivity", () => {
  it("creates association between a day and an activity", async () => {
    const user = await User.create({ username: "test", password: "password" });
    let plan = await Plan.create({
      name: "Test Plan",
      username: user.username
    });
    const day = await Day.create({ number: 1, planId: plan.id });
    const country = await Country.create({ name: "France" });
    const city = await City.create({ name: "Paris", countryId: country.id });
    const activity = await Activity.create({
      name: "Eiffel Tower",
      description: "It lights up at night",
      rating: "4.5",
      bookingLink: "http://signupforeiffeltower.com",
      price: "300",
      currencyCode: "EUR",
      cityId: city.id
    });
    await DayActivity.create({ dayId: day.id, activityId: activity.id });
    const activities = await day.getActivities();
    const days = await activity.getDays();

    expect(activities.length).toEqual(1);
    expect(activities[0].name).toEqual("Eiffel Tower");
    expect(days.length).toEqual(1);
    expect(days[0].number).toEqual(1);
  });
});