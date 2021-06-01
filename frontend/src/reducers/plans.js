import {
  LOAD_PLANS,
  ADD_PLAN,
  ADD_ACTIVITY_TO_PLAN,
  REMOVE_ACTIVITY_FROM_PLAN,
  RESET_ALL
} from "../actionTypes";

const INIT_STATE = {};

/**
 * Manages plans object in redux store
 * @param {Object} state 
 * @param {Object} action 
 * @returns new state for plans based on action
 */
const plans = (state=INIT_STATE, action) => {
  let plan;
  let day;
  switch (action.type) {
    case LOAD_PLANS:
      const plansObj = action.plans.reduce((obj, plan) => {
        obj[plan.id] = plan;
        return obj;
      }, {});
      return { ...state, ...plansObj };
    case ADD_PLAN:
      return { ...state, [action.plan.id]: action.plan };
    case ADD_ACTIVITY_TO_PLAN:
      plan = state[action.payload.planId];
      day = plan.days[action.payload.dayNumber];
      return {
        ...state,
        [action.payload.planId]: {
          ...plan,
          days: {
            ...plan.days,
            [action.payload.dayNumber]: {
              ...day, [action.payload.activity.id]: action.payload.activity
            }
          }
        }
      };
    case REMOVE_ACTIVITY_FROM_PLAN:
      plan = state[action.payload.planId];
      day = plan.days[action.payload.dayNumber];
      return {
        ...state,
        [action.payload.planId]: {
          ...plan,
          days: {
            ...plan.days,
            [action.payload.dayNumber]: {
              ...day, [action.payload.activityId]: undefined
            }
          }
        }
      };
    case RESET_ALL:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default plans;