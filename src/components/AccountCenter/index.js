import React, { useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserInfo, getUserTweets } from "../../store/actions/user";

import "./AccountCenter.css";
import placeholder from "../../assets/placeholder.png";
import AccountTweets from "./AccountTweets";

function AccountCenter(props) {
  useEffect(() => {
    props.getUserInfo(props.urlName);
  }, []);

  useEffect(() => {
    if (props.id) {
      props.getUserTweets(props.id);
    }
  }, [props.id]);

  return (
    <div className="AccountCenter">
      <div className="banner-img-container">
        <img
          src={placeholder}
          alt="Placeholder bannière"
          className="banner-img"
        />
      </div>
      <div className="profile-img-container">
        <img
          src={placeholder}
          alt="Placeholder profil"
          className="profile-img"
        />
      </div>
      <div className="account-header">
        {props.username === props.connectedUsername && (
          <div className="account-edit">
            <button
              type="submit"
              className="btn submit-button"
              value="Me connecter"
            >
              Éditer le profil
            </button>
          </div>
        )}
        <p className="account-name">{props.name}</p>
        <p className="account-username">@{props.username}</p>
        {props.biography && <p>{props.biography}</p>}
        <p>
          <i className="fa fa-calendar" aria-hidden="true"></i>A rejoint Twister
          en {moment(props.creationDate).format("MMMM YYYY")}
        </p>
      </div>
      <AccountTweets
        tweets={props.tweets}
        username={props.username}
        name={props.name}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  connectedUsername: state.user.current.username,
  username: state.user.profile.username,
  id: state.user.profile._id,
  name: state.user.profile.name,
  biography: state.user.profile.biography,
  creationDate: state.user.profile.creationDate,
  tweets: state.user.tweets,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserInfo,
      getUserTweets,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountCenter);
