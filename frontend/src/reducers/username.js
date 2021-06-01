import { SET_USERNAME, REMOVE_USERNAME, RESET_ALL } from "../actionTypes";

const INIT_STATE = null;

/**
 * Manages username value in redux store
 * @param {Object} state 
 * @param {Object} action 
 * @returns new state for username based on action
 */
const username = (state=INIT_STATE, action) => {
  switch(action.type) {
    case SET_USERNAME:
      return action.username;
    case REMOVE_USERNAME:
      return INIT_STATE;
    case RESET_ALL:
      return INIT_STATE;
    default:
      return state;
  }
};

export default username;