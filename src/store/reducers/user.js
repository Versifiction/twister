import isEmpty from "is-empty";

import {
  DELETE_USER_TWEET,
  GET_USER_INFO,
  GET_USER_TWEETS,
  LOGIN,
  LOGOUT,
  SET_CURRENT_USER,
} from "../constants/types";

const initialState = {
  isConnected: false,
  current: {},
  profile: {},
  tweets: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter((t) => t._id !== action.payload),
      };
    case GET_USER_INFO:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_USER_TWEETS:
      return { ...state, tweets: action.payload };
    case SET_CURRENT_USER:
      return {
        ...state,
        isConnected: !isEmpty(action.payload),
        current: action.payload,
      };
    case LOGIN:
      return { ...state, isConnected: true };
    case LOGOUT:
      return { ...state, isConnected: false, current: {} };
    default:
      return state;
  }
}
