import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { loginUser } from "../../store/actions/auth";

import "./Connexion.css";
import twitterLogoSVG from "../../assets/twitter-logo.svg";

function Connexion(props) {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    errors: {},
  });

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });
  }

  useEffect(() => {
    document.title = "Twister | Connexion";

    if (props.isConnected) {
      props.history.push("/");
    }
  }, [props]);

  useEffect(() => {
    if (props.errors) {
      setFields({ ...fields, errors: props.errors });
    }
  }, [props.errors]);

  function login(e) {
    e.preventDefault();

    setFields({ ...fields, lastConnection: new Date() });

    const { email, password } = fields;

    const userData = {
      email,
      password,
    };

    props.loginUser(userData);
  }

  return (
    <div className="Connexion">
      <section className="not-connected row">
        <div className="nc-col-1 col s12 m6"></div>
        <div className="nc-col-2 col s12 m6">
          <div className="container">
            <div className="row">
              <img src={twitterLogoSVG} className="logo" alt="Logo twitter" />
              <form className="col s12" onSubmit={login} autoComplete="off">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      placeholder="Adresse e-mail"
                      id="email"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="email"
                      className={classnames("validate", {
                        invalid: fields.errors.email,
                      })}
                    />
                    <span className="red-text">{fields.errors.email}</span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      placeholder="Mot de passe"
                      id="password"
                      onChange={(e) => handleChange(e)}
                      type="password"
                      name="password"
                      className={classnames("validate", {
                        invalid: fields.errors.password,
                      })}
                    />
                    <span className="red-text">{fields.errors.password}</span>
                  </div>
                  <div className="col s12">
                    <div className="centered">
                      <input
                        type="submit"
                        className="btn-large submit-button"
                        value="Me connecter"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <p>
                <Link to="/inscription" className="redirect">
                  Pas encore de compte ? Inscrivez-vous !
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  isConnected: state.user.isConnected,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Connexion);
