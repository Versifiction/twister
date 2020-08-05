import { combineReducers } from "redux";

import errors from "./errors";
import loading from "./loading";
import newTweet from "./newTweet";
import user from "./user";

const rootReducer = combineReducers({
  errors,
  loading,
  newTweet,
  user,
});

export default rootReducer;
