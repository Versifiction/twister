import { combineReducers } from "redux";

import user from "./user";
import newTweet from "./newTweet";

const rootReducer = combineReducers({
  user,
  newTweet,
});

export default rootReducer;
