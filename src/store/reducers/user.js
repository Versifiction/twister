import isEmpty from "is-empty";

import {
  DELETE_USER_TWEET,
  EDIT_BIO_AND_NAME,
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
    case EDIT_BIO_AND_NAME:
      return {
        ...state,
        profile: {
          ...state.profile,
          biography: action.payload.biography,
          name: action.payload.name,
        },
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
      state.profile.followers.filter((t) => t._id !== action.payload);

      return {
        ...state,
        profile: {
          ...state.profile,
          followers: state.profile.followers.filter(
            (t) => t !== action.payload
          ),
        },
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
        tweets:
          state.profile._id === state.current.id
            ? state.tweets.filter((t) => t._id !== action.idTweet)
            : state.tweets,
      };
    default:
      return state;
  }
}
