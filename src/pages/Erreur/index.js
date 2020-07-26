import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./Erreur.css";

function Erreur() {
  useEffect(() => {
    document.title = "Twister | 404";
  }, []);

  return (
    <div className="Erreur">
      <p>404</p>
      <br />
      <NavLink to="/home" href="/home">
        Revenir à l'accueil
      </NavLink>
    </div>
  );
}

export default Erreur;
