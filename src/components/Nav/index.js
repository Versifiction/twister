import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.css";
import twitterLogoSVG from "../../assets/twitter-logo.png";

function Nav() {
  return (
    <div class="Nav flex main-nav centered">
      <NavLink className="root-link" activeClassName="active" href="/" to="/">
        <img src={twitterLogoSVG} className="logo" alt="Logo twitter" />
      </NavLink>
    </div>
  );
}

export default Nav;
