import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logoutUser } from "../../store/actions/auth";

import "./Nav.css";
import twitterLogoSVG from "../../assets/twitter-logo.png";

function Nav(props) {
  return (
    <div className="Nav flex main-nav centered">
      <div></div>
      <div>
        <NavLink
          className="root-link"
          activeClassName="active"
          href="/home"
          to="/home"
        >
          <img src={twitterLogoSVG} className="logo" alt="Logo twitter" />
        </NavLink>
      </div>
      <div className="nav-right">
        <Link href="/account" to="/account">
          <i className="fa fa-user" aria-hidden="true"></i>
          <p className="nav-username">@{props.username}</p>
        </Link>
        <i
          className="fa fa-sign-out"
          aria-hidden="true"
          onClick={props.logoutUser}
        ></i>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.user.infos.username,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logoutUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
