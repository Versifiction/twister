import { LOGIN, LOGOUT } from "../constants/types";

const initialState = {
  isConnected: false,
  user: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isConnected: true };
    case LOGOUT:
      return { ...state, isConnected: false, user: {} };
    default:
      return state;
  }
}
