import axios from "axios";

import {
  NEW_TWEET_INPUT_CHANGE,
  SEND_NEW_TWEET,
  RESET_NEW_TWEET_INPUT,
} from "../constants/types";

export const sendNewTweet = (tweet) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_PORT}/api/tweets/new-tweet`, tweet)
    .then((res) => {
      console.log("res ", res);
      dispatch({
        type: SEND_NEW_TWEET,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const newTweetInputChange = (value) => (dispatch) => {
  dispatch({
    type: NEW_TWEET_INPUT_CHANGE,
    payload: value,
  });
};

export const resetNewTweetInput = () => (dispatch) => {
  dispatch({
    type: RESET_NEW_TWEET_INPUT,
  });
};
