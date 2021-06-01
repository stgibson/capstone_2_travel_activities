require("dotenv").config();
const express = require("express");
const router = express.Router();
const jsonSchema = require("jsonschema");
const ExpressError = require("../expressError");
const { User, City, Country, Activity, UserActivity } = require("../models");
const { cityCountryToLatLon, getActivities } = require("../helpers");
const activityQuerySchema = require("../schemas/activityQuery.json");

/**
 * Gets all activities in a city and country. If city or country are invalid or
 * not both present as query params, 400 error.
 * GET /activities
 * { city, country } => { activities: [id, name] }
 */
router.get("/", async (req, res, next) => {
  const { valid, errors } = jsonSchema.validate(req.query, activityQuerySchema);

  if (!valid) {
    const errStacks = [];
    for (let err of errors) {
      errStacks.push(err.stack);
    }
    const err = new ExpressError(errStacks, 400);
    return next(err);
  }
  let { city: cityName, country: countryName } = req.query;
  cityName = cityName.toLowerCase();
  countryName = countryName.toLowerCase();
  try {
    // if country and/or city aren't in db, add to db
    const [country] =
      await Country.findOrCreate({ where: { name: countryName } });
    let [city, created] = await City.findOrCreate({
      where: { name: cityName, countryId: country.id }
    });

    // if needed to create city, get activities from external API
    if (created) {
      // first convert to lat & lon
      const coordinates = await cityCountryToLatLon(cityName, countryName);
      if (!coordinates) {
        throw new ExpressError("Invalid city or country name", 400);
      }
      // then make API request
      const activities = await getActivities(coordinates.lat, coordinates.lon);
      for (let activity of activities) {
        const {
          name,
          shortDescription,
          rating,
          bookingLink,
          price
        } = activity;
        const { amount, currencyCode } = price;
        await Activity.create({
          name,
          description: shortDescription,
          rating,
          bookingLink,
          price: amount,
          currencyCode,
          cityId: city.id
        });
      }
    }
    const activities =
      await Activity.findAll({ where: { cityId: city.id }, attributes: ["id", "name"] });
    return res.json({ activities });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Gets details on an activity by id.
 * GET /activities/:id
 * {} => {
 *   activity: {
 *     id,
 *     name,
 *     description,
 *     rating,
 *     bookingLink,
 *     price,
 *     currencyCode
 *   }
 * }
 */
 router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const idInt = Number.parseInt(id);
    if (Number.isNaN(idInt)) {
      throw new ExpressError("Invalid request: id must be an integer", 400);
    }
    const activity = await Activity.findByPk(idInt);
    return res.json({ activity });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Adds activity to list of activities currently logged in user likes.
 * PUT /activities/:id/like
 * {} => { message: "activity liked" }
 */
router.put("/:id/like", async (req, res, next) => {
  try {
    const { id } = req.params;
    const idInt = Number.parseInt(id);
    if (Number.isNaN(idInt)) {
      throw new ExpressError("Invalid request: id must be an integer", 400);
    }
    const username = res.locals.username;
    await UserActivity.create({ username, activityId: idInt });
    return res.json({ message: "activity liked" });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Gets all activities currently logged in user likes.
 * GET /activities/like/all
 * {} => { activities: [{ id, name }, ...] }
 */
router.get("/like/all", async (req, res, next) => {
  try {
    const username = res.locals.username;
    const userAndActivities =
      await User.findOne({ where: { username }, include: Activity });
    const activities = userAndActivities.activities;
    const activitiesSimple = activities
      .map(activity => ({ id: activity.id, name: activity.name }));
    return res.json({ activities: activitiesSimple });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Removes activity from list of activities currently logged in user likes.
 * DELETE /activities/:id/unlike
 * {} => { message: "activity unliked" }
 */
router.delete("/:id/unlike", async (req, res, next) => {
  try {
    const { id } = req.params;
    const idInt = Number.parseInt(id);
    if (Number.isNaN(idInt)) {
      throw new ExpressError("Invalid request: id must be an integer", 400);
    }
    const username = res.locals.username;
    await UserActivity.destroy({ where: { username } });
    return res.json({ message: "activity unliked" });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;