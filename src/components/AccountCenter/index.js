import React, { useEffect } from "react";
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
      <AccountTweets tweets={props.tweets} username={props.username} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  connectedUsername: state.user.current.username,
  username: state.user.profile.username,
  id: state.user.profile._id,
  name: state.user.profile.name,
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
