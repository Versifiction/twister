import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import classnames from "classnames";
import Viewer from "react-viewer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  followUser,
  editBanner,
  editPicture,
  getBanner,
  getUserInfo,
  getUserTweets,
  getPicture,
  unfollowUser,
  editBioAndName,
} from "../../store/actions/user";

import "./AccountCenter.css";
import placeholderPicture from "../../assets/placeholderPicture.png";
import placeholderBanner from "../../assets/placeholderBanner.png";
import AccountTweets from "./AccountTweets";

function AccountCenter(props) {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [profilVisible, setProfilVisible] = useState(false);
  const [pictureFile, setPictureFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const hiddenPictureFileInput = useRef(null);
  const hiddenBannerFileInput = useRef(null);
  const [followed, setFollowed] = useState();
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState();
  const [biography, setBiography] = useState();

  useEffect(() => {
    props.getUserInfo(props.urlName);
    if (props.profile) {
      props.getPicture(props.profile._id);
      props.getBanner(props.profile._id);
    }
  }, [props.urlName]);

  useEffect(() => {
    if (props.profile && props.profile._id) {
      props.getUserTweets(props.profile._id);
      setFollowed(props.profile.followers.includes(props.current.id));
      setBiography(props.profile.biography);
      setName(props.profile.name);
    }
  }, [props.profile, props.urlName]);

  function handleClick(e) {
    if (editable) {
      if (e.target.name === "banner") {
        hiddenBannerFileInput.current.click();
      } else if (e.target.name === "picture") {
        hiddenPictureFileInput.current.click();
      }
    } else {
      console.log("not editable");
      if (e.target.name === "banner") {
        console.log("banner");
        setBannerVisible(true);
      } else if (e.target.name === "picture") {
        console.log("picture");
        setProfilVisible(true);
      }
    }
  }

  function handleChange(e) {
    if (e.target.name === "biography") {
      setBiography(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "banner") {
      setBannerFile(e.target.files[0]);
    } else if (e.target.name === "picture") {
      setPictureFile(e.target.files[0]);
    }
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

  function saveEdits(e) {
    e.preventDefault();

    setEditable(false);

    const obj = {
      id: props.current.id,
      biography,
      name,
    };

    const formData = new FormData();
    const formData2 = new FormData();

    formData.append("picture", pictureFile);
    formData2.append("banner", bannerFile);

    props.editPicture(formData, obj.id);
    props.editBanner(formData2, props.current.id);

    props.editBioAndName(obj);
  }

  return (
    <div className="AccountCenter">
      <form method="post" encType="multipart/form-data" onSubmit={saveEdits}>
        <div className="banner-img-container">
          {editable && (
            <input
              type="file"
              name="banner"
              ref={hiddenBannerFileInput}
              onChange={handleChange}
              className="input-file"
            />
          )}
          {!props.profile.bannerType ? (
            <img
              src={placeholderBanner}
              alt="Placeholder bannière"
              name="banner"
              className="banner-img"
              onClick={handleClick}
            />
          ) : (
            <>
              <img
                src={`${process.env.REACT_APP_SERVER_PORT}/api/users/banner/${props.profile._id}`}
                alt="Banniere"
                name="banner"
                className="banner-img"
                onClick={handleClick}
              />
              <Viewer
                visible={bannerVisible}
                onClose={() => {
                  setBannerVisible(false);
                }}
                images={[
                  {
                    src: `${process.env.REACT_APP_SERVER_PORT}/api/users/banner/${props.profile._id}`,
                    alt: "Banniere",
                  },
                ]}
              />
            </>
          )}
        </div>
        <div className="profile-img-container">
          {editable && (
            <input
              type="file"
              name="picture"
              ref={hiddenPictureFileInput}
              onChange={handleChange}
              className="input-file"
            />
          )}
          {!props.profile.profilePictureType ? (
            <img
              src={placeholderPicture}
              alt="Placeholder profil"
              name="picture"
              className="profile-img"
              onClick={handleClick}
            />
          ) : (
            <>
              <img
                src={`${process.env.REACT_APP_SERVER_PORT}/api/users/picture/${props.profile._id}`}
                alt="Profil"
                name="picture"
                className="profile-img"
                onClick={handleClick}
              />
              <Viewer
                visible={profilVisible}
                onClose={() => {
                  setProfilVisible(false);
                }}
                images={[
                  {
                    src: `${process.env.REACT_APP_SERVER_PORT}/api/users/picture/${props.profile._id}`,
                    alt: "Profil",
                  },
                ]}
              />
            </>
          )}
        </div>
      </form>
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
                  onClick={saveEdits}
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
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Nom"
                id="name"
                onChange={(e) => handleChange(e)}
                type="text"
                name="name"
                className="validate"
                value={name}
              />
            </div>
            <div className="input-field col s12">
              <input
                placeholder="Biographie"
                id="biography"
                onChange={(e) => handleChange(e)}
                type="text"
                name="biography"
                className="validate"
                value={biography}
              />
            </div>
          </div>
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
            {props.profile.protected && (
              <i className="fa fa-lock" aria-hidden="true"></i>
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
            {props.profile.biography && (
              <p className="account-biography">{props.profile.biography}</p>
            )}
            <p>
              <i className="fa fa-calendar" aria-hidden="true"></i>A rejoint
              Twister en{" "}
              {moment(props.profile.creationDate).format("MMMM YYYY")}
            </p>
          </>
        )}
      </div>
      {props.profile.protected &&
      props.current.id !== props.profile._id &&
      !props.profile.following.includes(props.current.id) ? (
        <div className="protected-content">
          <p className="protected-title">Ces tweets sont protégés</p>
          <p className="protected-text">
            L'utilisateur a protégé ses tweets. Seuls les personnes auxquelles
            il est abonné peuvent voir ses tweets.
          </p>
        </div>
      ) : (
        <AccountTweets />
      )}
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
    {
      editBioAndName,
      editBanner,
      editPicture,
      followUser,
      getBanner,
      getUserInfo,
      getUserTweets,
      getPicture,
      unfollowUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountCenter);
