import dotenv from "dotenv";
import axios from "axios";
import {
  LOAD_FAVORITE_ACTIVITIES,
  ADD_FAVORITE_ACTIVITY,
  REMOVE_FAVORITE_ACTIVITY,
  SHOW_ERR
} from "../actionTypes";

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
 * Creates action to load activities to redux store
 * @param {Array[Object]} activities 
 * @returns action
 */
const getFavoriteActivities = activities => {
  return { type: LOAD_FAVORITE_ACTIVITIES, activities };
};

/**
 * Returns redux thunk that gets all activities currently logged in user likes
 * and calls action creator to generate action to load activities in redux
 * store 
 * @param {string} token
 * @returns thunk
 */
const getFavoriteActivitiesFromAPI = token => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities/like/all`,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      const { activities } = res.data;
      dispatch(getFavoriteActivities(activities));
    }
    catch (err) {
      dispatch(showErr("Could not load your favorite activities."));
    }
  };
}

/**
 * Creates action to add new favorite activity to redux store
 * @param {Object{number|string}} activity 
 * @returns action
 */
const addFavoriteActivity = activity => {
  return { type: ADD_FAVORITE_ACTIVITY, activity };
};

/**
 * Returns redux thunk that adds activity to list of currently logged in user's
 * favorite activities in API and calls action creator to generate action to
 * add activity to redux store 
 * @param {number} id
 * @param {string} token
 * @returns thunk
 */
const addFavoriteActivityToAPI = (id, token) => {
  return async dispatch => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${id}/like`,
        {},
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${id}`,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      const { id: activityId, name } = res.data.activity;
      dispatch(addFavoriteActivity({ id: activityId, name }));
    }
    catch (err) {
      const msg =
        "Failed to add activity to your list of favorite activities.";
      dispatch(showErr(msg));
    }
  };
};

/**
 * Creates action to remove favorite activity from redux store
 * @param {string} id 
 * @returns action
 */
const removeFavoriteActivity = (id) => {
  return { type: REMOVE_FAVORITE_ACTIVITY, id };
};

/**
 * Returns redux thunk that removes activity from list of currently logged in
 * user's favorite activities in API and calls action creator to generate
 * action to remove activity from redux store 
 * @param {number} id
 * @param {string} token
 * @returns thunk
 */
const removeFavoriteActivityFromAPI = (id, token) => {
  return async dispatch => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${id}/unlike`,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      dispatch(removeFavoriteActivity(id));
    }
    catch (err) {
      const msg =
        "Failed to remove activity from your list of favorite activities.";
      dispatch(showErr(msg));
    }
  }
};

export { getFavoriteActivitiesFromAPI, addFavoriteActivityToAPI, removeFavoriteActivityFromAPI };