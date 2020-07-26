import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Accueil.css";
import Home from "../../components/Home";

function Accueil(props) {
  useEffect(() => {
    document.title = "Twister | Accueil";

    if (props.isConnected) {
      props.history.push("/home");
    }
  }, []);

  return (
    <div className="Accueil">
      {props.isConnected ? <Home /> : <Redirect to="/connexion" />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isConnected: state.user.isConnected,
});

export default connect(mapStateToProps)(Accueil);
