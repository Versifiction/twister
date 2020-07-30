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
        <Link href={`/user/${props.username}`} to={`/user/${props.username}`}>
          <i className="fa fa-user" aria-hidden="true"></i>
          <p className="nav-username">@{props.username}</p>
        </Link>
        <div onClick={props.logoutUser} className="nav-pointer">
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          <p className="nav-logout">Me déconnecter</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.user.current.username,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logoutUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
