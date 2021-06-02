import { SET_TOKEN, REMOVE_TOKEN } from "../actionTypes";

/**
 * Creates action to set username in redux store
 * @param {string} username
 * @returns action
 */
const setToken = (token) => {
  return { type: SET_TOKEN, token };
};

/**
 * Creates action to remove username from redux store
 * @returns action
 */
const removeToken = () => {
  return { type: REMOVE_TOKEN };
};

export { setToken, removeToken };