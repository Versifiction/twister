import { INPUT_CHANGE } from "../constants/types";

const initialState = {
  tweetValue: "",
  maxLength: 140,
  hasSurvey: false,
  hasGif: false,
  hasPicture: false,
};

export default function newTweet(state = initialState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return (state.tweetValue = action.value);
    default:
      return state;
  }
}
