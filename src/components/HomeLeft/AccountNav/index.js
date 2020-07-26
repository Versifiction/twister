import React from "react";
import { NavLink } from "react-router-dom";

import "./AccountNav.css";

function AccountNav() {
  return (
    <div className="AccountNav">
      <section className="account-nav">
        <li>
          <NavLink activeClassName="active" href="/home" to="/home">
            <i className="fa fa-home icon-account-nav" aria-hidden="true"></i>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/explore" to="/explore">
            <i
              className="fa fa-hashtag icon-account-nav"
              aria-hidden="true"
            ></i>{" "}
            Explorer
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            href="/notifications"
            to="/notifications"
          >
            <i className="fa fa-bell icon-account-nav" aria-hidden="true"></i>
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/messages" to="/messages">
            <i
              className="fa fa-envelope icon-account-nav"
              aria-hidden="true"
            ></i>{" "}
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/signets" to="/signets">
            <i
              className="fa fa-bookmark icon-account-nav"
              aria-hidden="true"
            ></i>
            Signets
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/lists" to="/lists">
            <i className="fa fa-list icon-account-nav" aria-hidden="true"></i>{" "}
            Listes
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/account" to="/account">
            <i className="fa fa-user icon-account-nav" aria-hidden="true"></i>
            Mon compte
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/settings" to="/settings">
            <i className="fa fa-cog icon-account-nav" aria-hidden="true"></i>
            Paramètres
          </NavLink>
        </li>
      </section>
    </div>
  );
}

export default AccountNav;
