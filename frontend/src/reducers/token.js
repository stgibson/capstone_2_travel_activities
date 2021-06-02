import { SET_TOKEN, REMOVE_TOKEN, RESET_ALL } from "../actionTypes";

const INIT_STATE = null;

/**
 * Manages token value in redux store
 * @param {Object} state 
 * @param {Object} action 
 * @returns new state for token based on action
 */
const token = (state=INIT_STATE, action) => {
  switch(action.type) {
    case SET_TOKEN:
      return action.token;
    case REMOVE_TOKEN:
      return INIT_STATE;
    case RESET_ALL:
      return INIT_STATE;
    default:
      return state;
  }
};

export default token;