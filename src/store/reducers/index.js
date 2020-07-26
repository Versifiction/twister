import { combineReducers } from "redux";

import user from "./user";
import newTweet from "./newTweet";
import errors from "./errors";

const rootReducer = combineReducers({
  user,
  newTweet,
  errors,
});

export default rootReducer;
