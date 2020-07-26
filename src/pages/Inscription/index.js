import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerUser } from "../../store/actions/auth";
import { Link } from "react-router-dom";
import classnames from "classnames";

import "./Inscription.css";
import twitterLogoSVG from "../../assets/twitter-logo.svg";

function Inscription(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    name: "",
    creationDate: null,
    errors: {},
  });

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });
  }

  useEffect(() => {
    document.title = "Twister | Inscription";

    if (props.isConnected) {
      props.history.push("/");
    }
  }, [props]);

  useEffect(() => {
    console.log("fields ", fields);
    if (props.errors) {
      setFields({ ...fields, errors: props.errors });
    }
  }, [props.errors, fields]);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  function register(e) {
    e.preventDefault();

    setFields({ ...fields, creationDate: new Date() });

    const newUser = {
      email: fields.email,
      password: fields.password,
      username: fields.username,
      name: fields.name,
      confirmPassword: fields.confirmPassword,
    };

    props.registerUser(newUser, props.history);
  }

  return (
    <div className="Inscription">
      <section className="not-connected row">
        <div className="nc-col-1 col s12 m6"></div>
        <div className="nc-col-2 col s12 m6">
          <div className="container">
            <div className="row">
              <img src={twitterLogoSVG} className="logo" alt="Logo twitter" />
              <form className="col s12" onSubmit={register}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      placeholder="Adresse e-mail"
                      name="email"
                      id="email"
                      value={fields.email}
                      onChange={(e) => handleChange(e)}
                      type="email"
                      className={classnames("validate", {
                        invalid: fields.errors.email,
                      })}
                      required
                    />
                    <i
                      className="material-icons tooltipped"
                      data-position="top"
                      data-tooltip="Veuillez saisir votre adresse e-mail"
                    >
                      error_outline
                    </i>
                    <span className="red-text">{fields.errors.email}</span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      placeholder="Nom d'utilisateur (@)"
                      id="username"
                      name="username"
                      value={fields.username}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      className={classnames("validate", {
                        invalid: fields.errors.username,
                      })}
                      required
                    />
                    <i
                      className="material-icons tooltipped"
                      data-position="top"
                      data-tooltip="Veuillez saisir votre nom d'utilisateur (qui sera automatiquement préfixé d'un @)"
                    >
                      error_outline
                    </i>
                    <span className="red-text">{fields.errors.username}</span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      placeholder="Nom"
                      id="name"
                      value={fields.name}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="name"
                      className={classnames("validate", {
                        invalid: fields.errors.name,
                      })}
                      required
                    />
                    <i
                      className="material-icons tooltipped"
                      data-position="top"
                      data-tooltip="Veuillez saisir votre nom (tweetname)"
                    >
                      error_outline
                    </i>
                    <span className="red-text">{fields.errors.name}</span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      placeholder="Mot de passe"
                      id="password"
                      value={fields.password}
                      onChange={(e) => handleChange(e)}
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      className={classnames("validate", {
                        invalid: fields.errors.password,
                      })}
                      required
                    />
                    <i
                      className="tiny material-icons right tooltipped eye"
                      data-position="bottom"
                      data-tooltip={
                        passwordVisible
                          ? "Masquer votre mot de passe"
                          : "Afficher votre mot de passe"
                      }
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "visibility_off" : "visibility"}
                    </i>
                    <i
                      className="material-icons tooltipped"
                      data-position="top"
                      data-tooltip="Votre mot de passe doit être constitué au minimum de 6 caractères dont une minuscule, une majuscule et un chiffre"
                    >
                      error_outline
                    </i>
                    <span className="red-text">{fields.errors.password}</span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      placeholder="Confirmer le mot de passe"
                      id="confirmPassword"
                      value={fields.confirmPassword}
                      onChange={(e) => handleChange(e)}
                      type={confirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      className={classnames("validate", {
                        invalid: fields.errors.confirmPassword,
                      })}
                      required
                    />
                    <i
                      className="tiny material-icons right tooltipped eye"
                      data-position="bottom"
                      data-tooltip={
                        confirmPasswordVisible
                          ? "Masquer votre mot de passe"
                          : "Afficher votre mot de passe"
                      }
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {confirmPasswordVisible ? "visibility_off" : "visibility"}
                    </i>
                    <i
                      className="material-icons tooltipped"
                      data-position="top"
                      data-tooltip="Veuillez confirmer votre mot de passe"
                    >
                      error_outline
                    </i>
                    <span className="red-text">
                      {fields.errors.confirmPassword}
                    </span>
                  </div>
                  <div className="col s12">
                    <div className="centered">
                      <input
                        type="submit"
                        className="btn-large submit-button"
                        value="M'inscrire"
                      />
                    </div>
                  </div>
                </div>
              </form>

              <p className="redirect">
                <Link to="/connexion">J'ai déjà un compte en fait !</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.user.errors,
  isConnected: state.user.isConnected,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      registerUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Inscription);
