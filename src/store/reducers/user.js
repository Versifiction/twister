import isEmpty from "is-empty";

import { SET_CURRENT_USER, LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  isConnected: false,
  user: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isConnected: !isEmpty(action.payload),
        infos: action.payload,
      };
    case LOGIN:
      return { ...state, isConnected: true };
    case LOGOUT:
      return { ...state, isConnected: false, user: {} };

    default:
      return state;
  }
}
