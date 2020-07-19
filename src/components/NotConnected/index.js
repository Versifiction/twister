import React from "react";

import "./NotConnected.css";
import { bgNotConnected } from "../../assets/bg-not-connected.png";
import { twitterLogoSVG } from "../../assets/twitter-logo.svg";

function NotConnected() {
  return (
    <div className="NotConnected">
      <section className="not-connected row">
        <div className="nc-col-1 col s12 m6">
          <img
            src={bgNotConnected}
            className="nc-logo"
            alt="Logo pas connecté"
          />
        </div>
        <div className="nc-col-2 col s12 m6">
          <div className="container">
            <div className="row">
              <img src={twitterLogoSVG} className="logo" alt="Logo twitter" />
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      placeholder="Nom d'utilisateur"
                      id="username"
                      type="text"
                      className="validate"
                    />
                  </div>
                  <div className="input-field col s12">
                    <input
                      placeholder="Mot de passe"
                      id="password"
                      type="text"
                      className="validate"
                    />
                  </div>
                </div>
              </form>
              <p>Pas encore de compte ? Inscrivez-vous !</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotConnected;
