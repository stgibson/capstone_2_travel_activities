import { SHOW_ERR } from "../actionTypes";

const INIT_STATE = [];

/**
 * Manages error value in redux store
 * @param {Object} state 
 * @param {Object} action 
 * @returns new state for error based on action
 */
const error = (state=INIT_STATE, action) => {
  switch(action.type) {
    case SHOW_ERR:
      return [...state, action.msg];
    // if not SHOW_ERR, no errors occured, so undo any prev errors
    default:
      return INIT_STATE;
  }
};

export default error;