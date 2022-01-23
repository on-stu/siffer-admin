import { combineReducers } from "redux";

import user from "./user";
import site from "./crawling_sites";
import products from "./products";
export default combineReducers({
  user,
  site,
  products,
});
