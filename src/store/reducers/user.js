import isEmpty from "is-empty";

import {
  DELETE_USER_TWEET,
  EDIT_BIO_AND_NAME,
  FOLLOW_USER,
  GET_BANNER,
  GET_FEED_USER,
  GET_PICTURE,
  GET_SUGGESTIONS,
  GET_TWEET_DETAIL,
  GET_USER_INFO,
  GET_USER_TWEETS,
  LIKE_TWEET,
  LOGIN,
  LOGOUT,
  PIN_TWEET,
  RETWEET_TWEET,
  SEND_NEW_TWEET,
  SET_CURRENT_USER,
  UNFOLLOW_USER,
  UNLIKE_TWEET,
  UNPIN_TWEET,
  UNRETWEET_TWEET,
} from "../constants/types";

const initialState = {
  current: {},
  isConnected: false,
  isLoading: true,
  profile: {},
  suggestions: [],
  tweetDetail: [],
  tweets: [],
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
    case GET_BANNER:
      return {
        ...state,
        profile: { ...state.profile, banner: action.payload },
      };
    case GET_FEED_USER:
      return {
        ...state,
        tweets: action.payload,
      };
    case GET_PICTURE:
      return {
        ...state,
        profile: { ...state.profile, profilePicture: action.payload },
      };
    case GET_TWEET_DETAIL:
      return {
        ...state,
        tweetDetail: action.payload,
      };
    case GET_USER_INFO:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_USER_TWEETS:
      return { ...state, tweets: action.payload };
    case GET_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
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
    case PIN_TWEET:
      return {
        ...state,
        profile: { ...state.profile, pinnedTweet: action.payload },
      };
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
    case UNPIN_TWEET:
      return {
        ...state,
        profile: { ...state.profile, pinnedTweet: "" },
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
          state.tweets.filter((t) => t._id === action.idTweet)[0].writerId !==
          state.current.id
            ? state.tweets.filter((t) => t._id !== action.idTweet)
            : state.tweets,
      };
    default:
      return state;
  }
}
