import { createStore, compose } from "redux";

import rootReducer from "./reducers/index";

const devTools = [];

if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}

const enhancers = compose(...devTools);

const store = createStore(rootReducer, enhancers);

export default store;
