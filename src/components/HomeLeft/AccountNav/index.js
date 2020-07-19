import React from "react";
import { NavLink } from "react-router-dom";

import "./AccountNav.css";

function AccountNav() {
  return (
    <div className="AccountNav">
      <section class="account-nav">
        <li>
          <NavLink className="" activeClassName="active" href="/" to="/">
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/explore" to="/explore">
            Explorer
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            href="/notifications"
            to="/notifications"
          >
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/messages" to="/messages">
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/signets" to="/signets">
            Signets
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/lists" to="/lists">
            Listes
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/account" to="/account">
            Mon compte
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/settings" to="/settings">
            Paramètres
          </NavLink>
        </li>
      </section>
    </div>
  );
}

export default AccountNav;
