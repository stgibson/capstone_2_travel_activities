import { SET_USERNAME, REMOVE_USERNAME } from "../actionTypes";

/**
 * Creates action to set username in redux store
 * @param {string} username
 * @returns action
 */
const setUsername = (username) => {
  return { type: SET_USERNAME, username };
};

/**
 * Creates action to remove username from redux store
 * @returns action
 */
const removeUsername = () => {
  return { type: REMOVE_USERNAME };
};

export { setUsername, removeUsername };