import {
  LOAD_FAVORITE_ACTIVITIES,
  ADD_FAVORITE_ACTIVITY,
  REMOVE_FAVORITE_ACTIVITY,
  RESET_ALL
} from "../actionTypes";

const INIT_STATE = {};

/**
 * Manages activities object in redux store
 * @param {Object} state 
 * @param {Object} action 
 * @returns new state for activities based on action
 */
const activities = (state=INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_FAVORITE_ACTIVITIES:
      const activitiesObj = action.activities.reduce((obj, activity) => {
        obj[activity.id] = activity;
        return obj;
      }, {});
      return { ...state, ...activitiesObj };
    case ADD_FAVORITE_ACTIVITY:
      return { ...state, [action.activity.id]: action.activity };
    case REMOVE_FAVORITE_ACTIVITY:
      return { ...state, [action.id]: undefined };
    case RESET_ALL:
      return { ...INIT_STATE };
    default:
      return state;
  }
};

export default activities;