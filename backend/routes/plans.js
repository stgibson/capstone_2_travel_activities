require("dotenv").config();
const express = require("express");
const router = express.Router();
const jsonSchema = require("jsonschema");
const ExpressError = require("../expressError");
const { Plan, Day, Activity, DayActivity } = require("../models");
const planSchema = require("../schemas/plan.json");

/**
 * Creates new travel plan with provided name and number of days. If any of the
 * data is invalid, 400 error.
 * POST /plans
 * { name, numOfDays } => { plan: { id, name } }
 */
router.post("/", async (req, res, next) => {
  // first validate data
  const { valid, errors } = jsonSchema.validate(req.body, planSchema);
  if (!valid) {
    const errStacks = [];
    for (let err of errors) {
      errStacks.push(err.stack);
    }
    const err = new ExpressError(errStacks, 400);
    return next(err);
  }

  try {
    const { name, numOfDays } = req.body;
    const { username } = res.locals;
    const plan = await Plan.create({ name, username });
    for (let i = 0; i < numOfDays; i++) {
      await Day.create({ number: i + 1, planId: plan.id });
    }
    res.status(201);
    return res.json({ plan });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Gets all plans currently logged in user has created
 * GET /plans
 * {} => { plans: [{ id, name }, ...] }
 */
router.get("/", async (req, res, next) => {
  try {
    const { username } = res.locals;
    const plans = await Plan.findAll({ where: { username } });
    return res.json({ plans });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Gets plan with all days currently logged in user has created
 * GET /plans/:id
 * {} => { plan: { id, name, days: [{ id, number }, ...] } }
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const idInt = Number.parseInt(id);
    if (Number.isNaN(idInt)) {
      throw new ExpressError("Invalid request: id must be an integer", 400);
    }
    const { username } = res.locals;
    const plan = await Plan.findByPk(idInt, { include: Day });
    if (plan.username !== username) {
      throw new ExpressError(
        "Unauthorized: you can only access travel plans you created",
        401
      );
    }
    return res.json({ plan });
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Adds an activity to a day
 * PUT /plans/planId/days/:number/activities/:activityId
 * {} => { message: "Added activity to day" }
 */
router.put(
  "/:planId/days/:number/activities/:activityId",
  async (req, res, next) => {
    try {
      // first validate ids are integers
      const { planId, number, activityId } = req.params;
      const planIdInt = Number.parseInt(planId);
      const numberInt = Number.parseInt(number);
      const activityIdInt = Number.parseInt(activityId);
      if (Number.isNaN(planIdInt)) {
        throw new ExpressError(
          "Invalid request: planId must be an integer",
          400
        );
      }
      if (Number.isNaN(numberInt)) {
        throw new ExpressError(
          "Invalid request: number must be an integer",
          400
        );
      }
      if (Number.isNaN(activityIdInt)) {
        throw new ExpressError(
          "Invalid request: activityId must be an integer",
          400
        );
      }

      // then, determine if user created plan day is in
      const { username } = res.locals;

      const plan = await Plan.findByPk(planIdInt, { include: Day });
      if (plan.username !== username) {
        throw new ExpressError(
          "Unauthorized: you may only edit your own travel plans",
          401
        );
      }

      // find id of day with given number in plan
      let dayId;
      for (let day of plan.days) {
        if (day.number === numberInt) {
          dayId = day.id;
          break;
        }
      }
      // if couldn't find dayId, bad request
      if (dayId) {
        // after validation, add activity to day
        await DayActivity.create({ dayId, activityId: activityIdInt });

        return res.json({ message: "Added activity to day" });
      }
      throw new ExpressError(
        `Invalid request: there aren't ${number} days in plan with id ${planId}`,
        400
      );
    }
    catch (err) {
      return next(err);
    }
  }
);

/**
 * Gets all activity in a day
 * GET /plans/:id/days/:number
 * {} => { day: { id, number, activities: [{ id, name }, ...] } }
 */
router.get("/:id/days/:number", async (req, res, next) => {
  try {
    // first validate id is integer
    const { id, number } = req.params;
    const idInt = Number.parseInt(id);
    const numberInt = Number.parseInt(number);
    if (Number.isNaN(idInt)) {
      throw new ExpressError("Invalid request: id must be an integer", 400);
    }
    if (Number.isNaN(numberInt)) {
      throw new ExpressError(
        "Invalid request: number must be an integer",
        400
      );
    }

    // then, determine if user created plan day is in
    const { username } = res.locals;

    const plan = await Plan.findByPk(idInt, { include: Day });
    if (plan.username !== username) {
      throw new ExpressError(
        "Unauthorized: you may only edit your own travel plans",
        401
      );
    }
    
    // find id of day with provided number
    let dayId;
    for (let day of plan.days) {
      if (day.number === numberInt) {
        dayId = day.id;
        break;
      }
    }

    if (dayId) {
      const day = await Day.findByPk(dayId, { include: Activity });
      return res.json({ day });
    }
    // if couldn't find day, bad request
    throw new ExpressError(
      `Invalid request: there aren't ${number} days in plan with id ${id}`,
      400
    );
  }
  catch (err) {
    return next(err);
  }
});

/**
 * Removes an activity from a day
 * DELETE /plans/:planId/days/:number/activities/:activityId
 * {} => { message: "Removed activity from day" }
 */
router.delete(
  "/:planId/days/:number/activities/:activityId",
  async (req, res, next) => {
    try {
      // first validate ids are integers
      const { planId, number, activityId } = req.params;
      const planIdInt = Number.parseInt(planId);
      const numberInt = Number.parseInt(number);
      const activityIdInt = Number.parseInt(activityId);
      if (Number.isNaN(planIdInt)) {
        throw new ExpressError(
          "Invalid request: planId must be an integer",
          400
        );
      }
      if (Number.isNaN(numberInt)) {
        throw new ExpressError(
          "Invalid request: number must be an integer",
          400
        );
      }
      if (Number.isNaN(activityIdInt)) {
        throw new ExpressError(
          "Invalid request: activityId must be an integer",
          400
        );
      }

      // then, determine if user created plan day is in
      const { username } = res.locals;

      let plan = await Plan.findByPk(planIdInt, { include: Day });
      if (plan.username !== username) {
        throw new ExpressError(
          "Unauthorized: you may only edit your own travel plans",
          401
        );
      }

      // find id of day with provided number
      let dayId;
      for (let day of plan.days) {
        if (day.number === numberInt) {
          dayId = day.id;
          break;
        }
      }

      if (dayId) {
        await DayActivity.destroy({ where: { dayId: dayId, activityId: activityIdInt } });
        return res.json({ message: "Removed activity from day" });
      }
      // if couldn't find day, bad request
      throw new ExpressError(
        `Invalid request: there aren't ${number} days in plan with id ${id}`,
        400
      );
    }
    catch (err) {
      return next(err);
    }
  }
);

module.exports = router;