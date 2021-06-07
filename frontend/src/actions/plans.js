import dotenv from "dotenv";
import axios from "axios";
import {
  LOAD_PLANS,
  ADD_PLAN,
  ADD_ACTIVITY_TO_PLAN,
  REMOVE_ACTIVITY_FROM_PLAN,
  SHOW_ERR
} from "../actionTypes";
import { getDaysInPlanFromAPI } from "./helpers";

dotenv.config();

/**
 * Creates action to add errors to redux store
 * @param {string} msg 
 * @returns action
 */
const showErr = msg => {
  return { type: SHOW_ERR, msg };
};

/**
 * Creates action to load plans to redux store
 * @param {Array[Object]} plans 
 * @returns action
 */
const getPlans = plans => {
  return { type: LOAD_PLANS, plans };
};

/**
 * Returns redux thunk that gets all plans created by currently logged in user
 * and calls action creator to generate action to load plans in redux store 
 * @param {string} token
 * @returns thunk
 */
const getPlansFromAPI = token => {
  return async dispatch => {
    try {
      const res =
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/plans`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
      const { plans } = res.data;
      // get days from each plan
      for (let i = 0; i < plans.length; i++) {
        const plan = plans[i];
        const days = await getDaysInPlanFromAPI(plan.id, token);
        plan.days = days;
      }
      dispatch(getPlans(plans));
    }
    catch (err) {
      dispatch(showErr(err.message));
    }
  };
}

/**
 * Creates action to add plan to redux store
 * @param {Object{number|string|Object}} plan
 * @returns action
 */
const addPlan = plan => {
  return { type: ADD_PLAN, plan };
};

/**
 * Returns redux thunk that adds plan to database and calls action creator to
 * generate action to add plan to redux store 
 * @param {Object{string|number}} plan
 * @param {string} token
 * @returns thunk
 */
const addPlanToAPI = (plan, token) => {
  return async dispatch => {
    try {
      const res =
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/plans`, plan, {
          headers: { "Authorization": `Bearer ${token}` }
        });
      const { plan: newPlan } = res.data;
      const days = {};
      for (let i = 0; i < plan.numOfDays; i++) {
        days[i + 1] = {};
      }
      newPlan.days = days;
      dispatch(addPlan(newPlan));
    }
    catch (err) {
      dispatch(showErr(err.message));
    }
  };
};

/**
 * Creates action to add activity to a day in redux store
 * @param {number} planId
 * @param {number} dayNumber
 * @param {Object{number|string}} activity
 * @returns action
 */
const addActivityToDay = (planId, dayNumber, activity) => {
  return { type: ADD_ACTIVITY_TO_PLAN, payload: { planId, dayNumber, activity } };
};

/**
 * Returns redux thunk that adds activity to a day in database and calls action
 * creator to generate action to add activity to day in redux store 
 * @param {number} planId
 * @param {number} dayNumber
 * @param {number} activityId
 * @param {string} token
 * @returns thunk
 */
const addActivityToDayInAPI = (planId, dayNumber, activityId, token) => {
  return async dispatch => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/plans/${planId}/days/${dayNumber}/activities/${activityId}`,
        {},
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${activityId}`,
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      const { name } = res.data.activity;
      dispatch(addActivityToDay(
        planId,
        dayNumber,
        { id: activityId, name }
      ));
    }
    catch (err) {
      dispatch(showErr(err.message));
    }
  };
};

/**
 * Creates action to remove activity from a day in redux store
 * @param {number} planId
 * @param {number} dayNumber
 * @param {number} activityId
 * @returns action
 */
const removeActivityFromDay = (planId, dayNumber, activityId) => {
  return { type: REMOVE_ACTIVITY_FROM_PLAN, payload: { planId, dayNumber, activityId } };
};

/**
 * Returns redux thunk that removes activity from a day in database and calls
 * action creator to generate action to remove activity from day in redux store
 * @param {number} planId
 * @param {number} dayNumber
 * @param {number} activityId
 * @param {string} token
 * @returns thunk
 */
const removeActivityFromDayInAPI = (planId, dayNumber, activityId, token) => {
  return async dispatch => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/plans/${planId}/days/${dayNumber}/activities/${activityId}`,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      dispatch(removeActivityFromDay(planId, dayNumber, activityId));
    }
    catch (err) {
      dispatch(showErr(err.message));
    }
  };
};

export {
  getPlansFromAPI,
  addPlanToAPI,
  addActivityToDayInAPI,
  removeActivityFromDayInAPI
};