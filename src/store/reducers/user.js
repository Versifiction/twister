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
      state.tweets
        .filter((t) => t._id === action.idTweet)[0]
        .likes.push(action.idUser);
      return {
        ...state,
        profile: {
          ...state.profile,
          likes: [...state.profile.likes, action.idTweet],
        },
      };
    case LOGIN:
      return { ...state, isConnected: true };
    case LOGOUT:
      return { ...state, isConnected: false, current: {} };
    case RETWEET_TWEET:
      state.tweets
        .filter((t) => t._id === action.idTweet)[0]
        .retweets.push(action.idUser);
      return {
        ...state,
        profile: {
          ...state.profile,
          retweets: [...state.profile.retweets, action.idTweet],
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
      const indexLike = state.tweets
        .filter((t) => t._id === action.idTweet)[0]
        .likes.indexOf(action.idUser);

      state.tweets
        .filter((t) => t._id === action.idTweet)[0]
        .likes.splice(indexLike, 1);
      return {
        ...state,
        profile: {
          ...state.profile,
          likes: state.profile.likes.filter((t) => t !== action.idTweet),
        },
      };
    case UNRETWEET_TWEET:
      const indexRt = state.tweets
        .filter((t) => t._id === action.idTweet)[0]
        .retweets.indexOf(action.idUser);

      state.tweets
        .filter((t) => t._id === action.idTweet)[0]
        .retweets.splice(indexRt, 1);
      return {
        ...state,
        profile: {
          ...state.profile,
          retweets: state.profile.retweets.filter((t) => t !== action.idTweet),
        },
      };
    default:
      return state;
  }
}
