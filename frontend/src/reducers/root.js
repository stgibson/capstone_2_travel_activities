import activities from "./activities";
import errors from "./errors";
import plans from "./plans";
import token from "./token";
import { combineReducers } from "redux";

export default combineReducers({ activities, errors, plans, token });