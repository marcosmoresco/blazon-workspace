import { combineReducers } from "redux";
import { message } from "./message";
import { cart } from "./cart";

export default combineReducers({
  message,
  cart,
});
