import {
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
} from "../constants/types";

const initialState = {
  loadingFeed: false,
  loadingAccount: false,
  loadingSettings: false,
  loadingTrends: false,
  loadingSuggestions: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_ACCOUNT:
      return { ...state, loadingAccount: true };
    case LOADING_FEED:
      return { ...state, loadingFeed: true };
    case LOADING_SETTINGS:
      return { ...state, loadingSettings: true };
    case LOADING_SUGGESTIONS:
      return { ...state, loadingSuggestions: true };
    case LOADING_TRENDS:
      return { ...state, loadingTrends: true };
    case LOADING_ACCOUNT_SUCCESS:
      return { ...state, loadingAccount: false };
    case LOADING_FEED_SUCCESS:
      return { ...state, loadingFeed: false };
    case LOADING_SETTINGS_SUCCESS:
      return { ...state, loadingSettings: false };
    case LOADING_SUGGESTIONS_SUCCESS:
      return { ...state, loadingSuggestions: false };
    case LOADING_TRENDS_SUCCESS:
      return { ...state, loadingTrends: false };
    case LOADING_ACCOUNT_FAIL:
      return { ...state, loadingAccount: false };
    case LOADING_FEED_FAIL:
      return { ...state, loadingFeed: false };
    case LOADING_SETTINGS_FAIL:
      return { ...state, loadingSettings: false };
    case LOADING_SUGGESTIONS_FAIL:
      return { ...state, loadingSuggestions: false };
    case LOADING_TRENDS_FAIL:
      return { ...state, loadingTrends: false };
    default:
      return state;
  }
}
