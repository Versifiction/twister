import React from "react";
import { NavLink } from "react-router-dom";

import "./Infos.css";

function Infos() {
  return (
    <div className="Infos">
      <aside>
        <NavLink to="/a-propos" href="/a-propos">
          <p>A propos</p>
        </NavLink>
        <NavLink to="/a-propos" href="/a-propos">
          <p>Contact</p>
        </NavLink>
        <NavLink to="/a-propos" href="/a-propos">
          <p>Conditions d'utilisation</p>
        </NavLink>
        <NavLink to="/a-propos" href="/a-propos">
          <p>Cookies</p>
        </NavLink>
      </aside>
    </div>
  );
}

export default Infos;
