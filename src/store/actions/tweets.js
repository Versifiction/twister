import axios from "axios";

import {
  LIKE_TWEET,
  NEW_TWEET_INPUT_CHANGE,
  SEND_NEW_TWEET,
  RESET_NEW_TWEET_INPUT,
  RETWEET_TWEET,
  UNLIKE_TWEET,
  UNRETWEET_TWEET,
} from "../constants/types";

export const sendNewTweet = (tweet) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_PORT}/api/tweets/new-tweet`, tweet)
    .then((res) => {
      dispatch({
        type: SEND_NEW_TWEET,
        payload: res.data,
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

export const retweetTweet = (idTweet, idUser) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_PORT}/api/tweets/retweet/${idTweet}`,
      { idUser }
    )
    .then((res) => {
      dispatch({
        type: RETWEET_TWEET,
        idTweet,
        idUser,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const unretweetTweet = (idTweet, idUser) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_PORT}/api/tweets/unretweet/${idTweet}`,
      { idUser }
    )
    .then((res) => {
      dispatch({
        type: UNRETWEET_TWEET,
        idTweet,
        idUser,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const likeTweet = (idTweet, idUser) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_PORT}/api/tweets/like/${idTweet}`, {
      idUser,
    })
    .then((res) => {
      dispatch({
        type: LIKE_TWEET,
        idTweet,
        idUser,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const unlikeTweet = (idTweet, idUser) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_PORT}/api/tweets/unlike/${idTweet}`, {
      idUser,
    })
    .then((res) => {
      dispatch({
        type: UNLIKE_TWEET,
        idTweet,
        idUser,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};
