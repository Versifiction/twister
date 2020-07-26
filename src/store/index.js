import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";

const devTools = [];
const middleware = [thunk];

if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}

const enhancers = compose(applyMiddleware(...middleware), ...devTools);

const store = createStore(rootReducer, enhancers);

export default store;
