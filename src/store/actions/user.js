import axios from "axios";

import {
  DELETE_USER_TWEET,
  EDIT_BIO_AND_NAME,
  EDIT_BANNER,
  EDIT_PICTURE,
  FOLLOW_USER,
  GET_BANNER,
  GET_ERRORS,
  GET_FEED_USER,
  GET_PICTURE,
  GET_SUGGESTIONS,
  GET_USER_INFO,
  GET_USER_TWEETS,
  LOADING_ACCOUNT,
  LOADING_FEED,
  LOADING_SETTINGS,
  LOADING_SUGGESTIONS,
  LOADING_TRENDS,
  LOADING_ACCOUNT_SUCCESS,
  LOADING_FEED_SUCCESS,
  LOADING_SETTINGS_SUCCESS,
  LOADING_SUGGESTIONS_SUCCESS,
  LOADING_TRENDS_SUCCESS,
  LOADING_ACCOUNT_FAIL,
  LOADING_FEED_FAIL,
  LOADING_SETTINGS_FAIL,
  LOADING_SUGGESTIONS_FAIL,
  LOADING_TRENDS_FAIL,
  UNFOLLOW_USER,
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
    });
};

export const getUserTweets = (id) => (dispatch) => {
  dispatch({
    type: LOADING_ACCOUNT,
  });

  axios
    .get(`${process.env.REACT_APP_SERVER_PORT}/api/tweets/${id}`)
    .then((res) => {
      dispatch({
        type: GET_USER_TWEETS,
        payload: res.data,
      });
      dispatch({
        type: LOADING_ACCOUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err ", err);
      dispatch({
        type: LOADING_ACCOUNT_FAIL,
        payload: err,
      });
    });
};

export const getFeedUser = (id) => (dispatch) => {
  dispatch({
    type: LOADING_FEED,
  });

  axios
    .get(`${process.env.REACT_APP_SERVER_PORT}/api/tweets/following/${id}`)
    .then((res) => {
      dispatch({
        type: GET_FEED_USER,
        payload: res.data,
      });
      dispatch({
        type: LOADING_FEED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err ", err);
      dispatch({
        type: LOADING_FEED_FAIL,
        payload: err,
      });
    });
};

export const deleteUserTweet = (id) => (dispatch) => {
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

export const followUser = (currentUserId, idToFollow) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_PORT}/api/users/user/follow/${currentUserId}`,
      { idToFollow }
    )
    .then((res) => {
      dispatch({
        type: FOLLOW_USER,
        payload: currentUserId,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const unfollowUser = (currentUserId, idToUnfollow) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_PORT}/api/users/user/unfollow/${currentUserId}`,
      { idToUnfollow }
    )
    .then((res) => {
      dispatch({
        type: UNFOLLOW_USER,
        payload: currentUserId,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const getSuggestions = () => (dispatch) => {
  dispatch({
    type: LOADING_SUGGESTIONS,
  });

  axios
    .get(`${process.env.REACT_APP_SERVER_PORT}/api/users/getRandom`)
    .then((res) => {
      dispatch({
        type: GET_SUGGESTIONS,
        payload: res.data,
      });
      dispatch({
        type: LOADING_SUGGESTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err ", err);
      dispatch({
        type: LOADING_SUGGESTIONS_FAIL,
        payload: err,
      });
    });
};

export const editBioAndName = (obj) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_PORT}/api/users/editBioAndName`, {
      obj,
    })
    .then((res) => {
      dispatch({
        type: EDIT_BIO_AND_NAME,
        payload: obj,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const editPicture = (obj, id) => (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  axios
    .post(
      `${process.env.REACT_APP_SERVER_PORT}/api/users/editPicture/${id}`,
      obj,
      config
    )
    .then((res) => {
      console.log("res ", res);
      dispatch({
        type: EDIT_PICTURE,
        payload: obj,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const editBanner = (obj, id) => (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  axios
    .post(
      `${process.env.REACT_APP_SERVER_PORT}/api/users/editBanner/${id}`,
      obj,
      config
    )
    .then((res) => {
      dispatch({
        type: EDIT_BANNER,
        payload: obj,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const getBanner = (id) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_PORT}/api/users/banner/${id}`)
    .then((res) => {
      console.log("res ", res);
      dispatch({
        type: GET_BANNER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

export const getPicture = (id) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_PORT}/api/users/picture/${id}`)
    .then((res) => {
      console.log("res ", res);
      dispatch({
        type: GET_PICTURE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};
