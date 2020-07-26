import React from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/auth";
import "./App.css";
import store from "./store";

import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Account from "./pages/Account";
import Lists from "./pages/Lists";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Signets from "./pages/Signets";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import Cookies from "./pages/Cookies";
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
      <Route path="/home" exact component={Accueil} />
      <Route path="/connexion" exact component={Connexion} />
      <Route path="/inscription" exact component={Inscription} />
      <Route path="/account" exact component={Account} />
      <Route path="/notifications" exact component={Notifications} />
      <Route path="/messages" exact component={Messages} />
      <Route path="/signets" exact component={Signets} />
      <Route path="/lists" exact component={Lists} />
      <Route path="/settings" exact component={Settings} />
      <Route path="/a-propos" exact component={APropos} />
      <Route path="/contact" exact component={Contact} />
      <Route
        path="/conditions-utilisation"
        exact
        component={ConditionsUtilisation}
      />
      <Route path="/cookies" exact component={Cookies} />
      <Route component={Erreur} />
    </Switch>
  );
}

export default Router;
