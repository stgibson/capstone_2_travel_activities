require("dotenv").config();
const express = require("express");
const router = express.Router();
const jsonSchema = require("jsonschema");
const ExpressError = require("../expressError");
const { User, Activity, Plan, Day } = require("../models");
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
 * {} => { plan: { id, name, days: [id, number] } }
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

module.exports = router;