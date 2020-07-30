import React, { useEffect, useState } from "react";
import moment from "moment";
import classnames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  followUser,
  getUserInfo,
  getUserTweets,
  unfollowUser,
} from "../../store/actions/user";

import "./AccountCenter.css";
import placeholderPicture from "../../assets/placeholderPicture.png";
import placeholderBanner from "../../assets/placeholderBanner.png";
import AccountTweets from "./AccountTweets";

function AccountCenter(props) {
  const [followed, setFollowed] = useState();

  useEffect(() => {
    props.getUserInfo(props.urlName);
    // if (props.profile) {
    //   console.log("1");
    //   setFollowed(props.profile.followers.includes(props.current.id));
    // }
  }, []);

  useEffect(() => {
    if (props.profile._id) {
      props.getUserTweets(props.profile._id);
      setFollowed(props.profile.followers.includes(props.current.id));
    }
  }, [props.profile._id]);

  function toggleFollowed() {
    setFollowed(!followed);

    if (!followed) {
      props.followUser(props.current.id, props.profile._id);
    } else {
      props.unfollowUser(props.current.id, props.profile._id);
    }
  }

  return (
    <div className="AccountCenter">
      <div className="banner-img-container">
        <img
          src={placeholderBanner}
          alt="Placeholder bannière"
          className="banner-img"
        />
      </div>
      <div className="profile-img-container">
        <img
          src={placeholderPicture}
          alt="Placeholder profil"
          className="profile-img"
        />
      </div>
      <div className="account-header">
        {props.profile.username !== props.current.username ? (
          <div className="account-follow">
            <button
              className={classnames("btn submit-button", {
                "outline-btn": !followed,
              })}
              onClick={toggleFollowed}
            >
              {followed ? "Suivi" : "Suivre"}
            </button>
          </div>
        ) : (
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
        <p className="account-name">{props.profile.name}</p>
        <p className="account-username">@{props.profile.username}</p>
        <div className="account-follows">
          {props.profile.following && (
            <span className="account-following">
              <span className="bold">{props.profile.following.length}</span>{" "}
              abonnements
            </span>
          )}
          &nbsp;
          {props.profile.followers && (
            <span className="account-followers">
              <span className="bold">{props.profile.followers.length}</span>{" "}
              abonnés
            </span>
          )}
        </div>
        {props.profile.biography && <p>{props.profile.biography}</p>}
        <p>
          <i className="fa fa-calendar" aria-hidden="true"></i>A rejoint Twister
          en {moment(props.profile.creationDate).format("MMMM YYYY")}
        </p>
      </div>
      <AccountTweets />
    </div>
  );
}

const mapStateToProps = (state) => ({
  current: state.user.current,
  profile: state.user.profile,
  tweets: state.user.tweets,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { followUser, getUserInfo, getUserTweets, unfollowUser },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountCenter);
