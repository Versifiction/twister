import isEmpty from "is-empty";

import {
  DELETE_USER_TWEET,
  FOLLOW_USER,
  GET_FEED_USER,
  GET_USER_INFO,
  GET_USER_TWEETS,
  GET_SUGGESTIONS,
  LIKE_TWEET,
  LOGIN,
  LOGOUT,
  RETWEET_TWEET,
  SEND_NEW_TWEET,
  SET_CURRENT_USER,
  UNFOLLOW_USER,
  UNLIKE_TWEET,
  UNRETWEET_TWEET,
} from "../constants/types";

const initialState = {
  isConnected: false,
  current: {},
  profile: {},
  tweets: [],
  suggestions: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter((t) => t._id !== action.payload),
      };
    case FOLLOW_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          followers: [...state.profile.followers, action.payload],
        },
      };
    case GET_FEED_USER:
      return {
        ...state,
        tweets: action.payload,
      };
    case GET_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    case GET_USER_INFO:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_USER_TWEETS:
      return { ...state, tweets: action.payload };
    case SEND_NEW_TWEET:
      return { ...state, tweets: [action.payload, ...state.tweets] };
    case SET_CURRENT_USER:
      return {
        ...state,
        isConnected: !isEmpty(action.payload),
        current: action.payload,
      };
    case LIKE_TWEET:
      return {
        ...state,
        profile: {
          ...state.profile,
          likes: [...state.profile.likes, action.payload],
        },
      };
    case LOGIN:
      return { ...state, isConnected: true };
    case LOGOUT:
      return { ...state, isConnected: false, current: {} };
    case RETWEET_TWEET:
      return {
        ...state,
        profile: {
          ...state.profile,
          retweets: [...state.profile.retweets, action.payload],
        },
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        profile: state.profile.followers.filter(
          (t) => t._id !== action.payload
        ),
      };
    case UNLIKE_TWEET:
      return {
        ...state,
        profile: {
          ...state.profile,
          retweets: state.profile.likes.filter((t) => t !== action.payload),
        },
      };
    case UNRETWEET_TWEET:
      return {
        ...state,
        profile: {
          ...state.profile,
          retweets: state.profile.retweets.filter((t) => t !== action.payload),
        },
      };
    default:
      return state;
  }
}
