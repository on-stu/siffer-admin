import { combineReducers } from "redux";

import user from "./user";
import site from "./crawling_sites";
export default combineReducers({
  user,
  site,
});
