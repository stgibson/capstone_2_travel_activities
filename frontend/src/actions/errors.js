import { SHOW_ERR } from "../actionTypes";

/**
 * Creates action to add errors to redux store
 * @param {string} msg 
 * @returns action
 */
const showErr = msg => {
  return { type: SHOW_ERR, msg };
};

export { showErr };