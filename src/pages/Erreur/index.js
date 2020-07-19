import React from "react";
import { NavLink } from "react-router-dom";

import "./Erreur.css";

function Erreur() {
  return (
    <div className="Erreur">
      <p>404</p>
      <br />
      <NavLink to="/" href="/">
        Revenir à l'accueil
      </NavLink>
    </div>
  );
}

export default Erreur;
