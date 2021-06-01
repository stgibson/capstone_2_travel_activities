import activities from "./activities";
import error from "./error";
import plans from "./plans";
import username from "./username";
import { combineReducers } from "redux";

export default combineReducers({ activities, error, plans, username });