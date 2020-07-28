import {
  NEW_TWEET_INPUT_CHANGE,
  RESET_NEW_TWEET_INPUT,
} from "../constants/types";

const initialState = {
  tweetValue: "",
  maxLength: 140,
  hasSurvey: false,
  hasGif: false,
  hasPicture: false,
};

export default function newTweet(state = initialState, action) {
  switch (action.type) {
    case NEW_TWEET_INPUT_CHANGE:
      return { ...state, tweetValue: action.payload };
    case RESET_NEW_TWEET_INPUT:
      return { ...state, tweetValue: "" };
    default:
      return state;
  }
}
