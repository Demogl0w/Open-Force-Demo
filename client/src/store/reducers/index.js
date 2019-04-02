import { combineReducers } from "redux";
import quoteReducer from "./quote";

export default combineReducers({
  quote: quoteReducer
});
