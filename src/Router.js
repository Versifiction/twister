import React from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/auth";
import "./App.css";
import store from "./store";

import Accueil from "./pages/Accueil";
import Erreur from "./pages/Erreur";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Accueil} />
      <Route component={Erreur} />
    </Switch>
  );
}

export default Router;
