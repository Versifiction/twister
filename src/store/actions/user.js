import axios from "axios";

import {
  DELETE_USER_TWEET,
  GET_ERRORS,
  GET_USER_INFO,
  GET_USER_TWEETS,
} from "../constants/types";

export const getUserInfo = (username) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_PORT}/api/users/user/${username}`)
    .then((res) => {
      dispatch({
        type: GET_USER_INFO,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      console.log("err ", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserTweets = (id) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_PORT}/api/tweets/${id}`)
    .then((res) => {
      console.log("res ", res);
      dispatch({
        type: GET_USER_TWEETS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const deleteUserTweet = (id) => (dispatch) => {
  console.log("delet");
  axios
    .delete(`${process.env.REACT_APP_SERVER_PORT}/api/tweets/delete/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_USER_TWEET,
        payload: id,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};
