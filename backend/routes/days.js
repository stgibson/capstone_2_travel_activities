require("dotenv").config();
const express = require("express");
const router = express.Router();
const jsonSchema = require("jsonschema");
const ExpressError = require("../expressError");
const { Activity, Plan, Day, DayActivity } = require("../models");

/**
 * Adds an activity to a day
 * PUT /days/:dayId/activities/:activityId
 * {} => { message: "Added activity to day" }
 */
router.put("/:dayId/activities/:activityId", async (req, res, next) => {
  try {
    // first validate ids are integers
    const { dayId, activityId } = req.params;
    const dayIdInt = Number.parseInt(dayId);
    const activityIdInt = Number.parseInt(activityId);
    if (Number.isNaN(dayIdInt)) {
      throw new ExpressError("Invalid request: dayId must be an integer", 400);
    }
    if (Number.isNaN(activityIdInt)) {
      throw new ExpressError(
        "Invalid request: activityId must be an integer",
        400
      );
    }

    // then, determine if user created plan day is in
    const { username } = res.locals;

    let day = await Day.findByPk(dayIdInt, { include: Plan });
    if (day.plan.username !== username) {
      throw new ExpressError(
        "Unauthorized: you may only edit your own travel plans",
        401
      );
    }

    // after validation, add activity to day
    await DayActivity.create({ dayId: dayIdInt, activityId: activityIdInt });

    return res.json({ message: "Added activity to day" });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Gets all activity in a day
 * GET /days/:id
 * {} => { day: { id, number, activities: [{ id, name }, ...] } }
 */
router.get("/:id", async (req, res, next) => {
  try {
    // first validate id is integer
    const { id } = req.params;
    const idInt = Number.parseInt(id);
    if (Number.isNaN(idInt)) {
      throw new ExpressError("Invalid request: id must be an integer", 400);
    }

    // then, determine if user created plan day is in
    const { username } = res.locals;

    const day = await Day.findByPk(idInt, { include: Activity });
    const plan = await day.getPlan();
    if (plan.username !== username) {
      throw new ExpressError(
        "Unauthorized: you may only edit your own travel plans",
        401
      );
    }

    return res.json({ day });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Removes an activity from a day
 * DELETE /days/:dayId/activities/:activityId
 * {} => { message: "Removed activity from day" }
 */
 router.delete("/:dayId/activities/:activityId", async (req, res, next) => {
  try {
    // first validate ids are integers
    const { dayId, activityId } = req.params;
    const dayIdInt = Number.parseInt(dayId);
    const activityIdInt = Number.parseInt(activityId);
    if (Number.isNaN(dayIdInt)) {
      throw new ExpressError("Invalid request: dayId must be an integer", 400);
    }
    if (Number.isNaN(activityIdInt)) {
      throw new ExpressError(
        "Invalid request: activityId must be an integer",
        400
      );
    }

    // then, determine if user created plan day is in
    const { username } = res.locals;

    let day = await Day.findByPk(dayIdInt, { include: Plan });
    if (day.plan.username !== username) {
      throw new ExpressError(
        "Unauthorized: you may only edit your own travel plans",
        401
      );
    }

    // after validation, add activity to day
    await DayActivity.destroy({ where: { dayId: dayIdInt, activityId: activityIdInt } });

    return res.json({ message: "Removed activity from day" });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;