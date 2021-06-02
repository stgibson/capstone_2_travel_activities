import activities from "./activities";
import error from "./error";
import plans from "./plans";
import token from "./token";
import { combineReducers } from "redux";

export default combineReducers({ activities, error, plans, token });