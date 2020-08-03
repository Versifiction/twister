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
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    props.getUserInfo(props.urlName);
  }, [props.urlName]);

  useEffect(() => {
    if (props.profile._id) {
      props.getUserTweets(props.profile._id);
      setFollowed(props.profile.followers.includes(props.current.id));
    }
  }, [props.profile._id, props.urlName]);

  function handleChange(e) {
    console.log("e t v", e.target.value);
  }

  function toggleEditable() {
    setEditable(!editable);
  }

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
            {editable ? (
              <>
                <button
                  type="submit"
                  className="btn outline-btn submit-button"
                  onClick={toggleEditable}
                >
                  Annuler
                </button>{" "}
                <button
                  type="submit"
                  className="btn submit-button"
                  onClick={toggleEditable}
                >
                  Sauvegarder
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="btn submit-button"
                onClick={toggleEditable}
              >
                Éditer le profil
              </button>
            )}
          </div>
        )}
        {editable ? (
          <>
            <div className="input-field col s12">
              <input
                placeholder="Nom"
                id="name"
                onChange={(e) => handleChange(e)}
                type="text"
                name="name"
                className="validate"
                value={props.current.name}
              />
              {/* <span className="red-text">{fields.errors.password}</span> */}
            </div>
            <div className="input-field col s12">
              <input
                placeholder="Biographie"
                id="biography"
                onChange={(e) => handleChange(e)}
                type="text"
                name="biography"
                className="validate"
                value={props.current.biography}
              />
              {/* <span className="red-text">{fields.errors.password}</span> */}
            </div>
          </>
        ) : (
          <>
            <p className="account-name">{props.profile.name}</p>
            <p className="account-username">@{props.profile.username}</p>
            {props.profile.verified && (
              <i
                className="fa fa-check-circle"
                aria-hidden="true"
                alt="Vérifié"
              ></i>
            )}
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
              <i className="fa fa-calendar" aria-hidden="true"></i>A rejoint
              Twister en{" "}
              {moment(props.profile.creationDate).format("MMMM YYYY")}
            </p>
          </>
        )}
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
