import React, { useRef } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  newTweetInputChange,
  resetNewTweetInput,
  sendNewTweet,
} from "../../../store/actions/tweets";

import "./AccountNav.css";

function AccountNav(props) {
  const newTweetInput = useRef(null);

  function focusNewTweetInput() {
    newTweetInput.current.focus();
  }

  function tweet(e) {
    const tweetData = {
      tweetValue: props.tweetValue,
      writerId: props.id,
    };

    props.sendNewTweet(tweetData);

    props.resetNewTweetInput();
  }

  return (
    <div className="AccountNav">
      <section className="account-nav">
        <li>
          <NavLink activeClassName="active" href="/home" to="/home">
            <i className="fa fa-home icon-account-nav" aria-hidden="true"></i>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/explore" to="/explore">
            <i
              className="fa fa-hashtag icon-account-nav"
              aria-hidden="true"
            ></i>{" "}
            Explorer
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            href="/notifications"
            to="/notifications"
          >
            <i className="fa fa-bell icon-account-nav" aria-hidden="true"></i>
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/messages" to="/messages">
            <i
              className="fa fa-envelope icon-account-nav"
              aria-hidden="true"
            ></i>{" "}
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/signets" to="/signets">
            <i
              className="fa fa-bookmark icon-account-nav"
              aria-hidden="true"
            ></i>
            Signets
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/lists" to="/lists">
            <i className="fa fa-list icon-account-nav" aria-hidden="true"></i>{" "}
            Listes
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            href={`/user/${props.username}`}
            to={`/user/${props.username}`}
          >
            <i className="fa fa-user icon-account-nav" aria-hidden="true"></i>
            Mon compte
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" href="/settings" to="/settings">
            <i className="fa fa-cog icon-account-nav" aria-hidden="true"></i>
            Paramètres
          </NavLink>
        </li>
        <button
          data-target="modal1"
          className="btn-large modal-trigger"
          onClick={focusNewTweetInput}
        >
          Tweeter
        </button>
        <div id="modal1" className="modal">
          <div className="modal-header">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </a>
          </div>
          <div className="modal-content">
            <h4 className="new-tweet-title">Nouveau tweet</h4>
            <textarea
              type="text"
              value={props.tweetValue}
              onChange={(e) => props.newTweetInputChange(e.target.value)}
              placeholder="Quoi de neuf ?"
              ref={newTweetInput}
            />
          </div>
          <div className="modal-footer">
            <div className="new-tweet-counter-container">
              <span
                className={classNames("new-tweet-length", {
                  "new-tweet-length-red": props.tweetValue.length > 140,
                })}
              >
                {props.tweetValue.length}
              </span>
              <span className="new-tweet-max-length">/{props.maxLength}</span>
            </div>
            <div>
              <button
                className="btn modal-close"
                onClick={(e) => tweet(e)}
                disabled={props.tweetValue.length > 140}
              >
                Tweeter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.user.current.username,
  id: state.user.current.id,
  tweetValue: state.newTweet.tweetValue,
  maxLength: state.newTweet.maxLength,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      newTweetInputChange,
      resetNewTweetInput,
      sendNewTweet,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountNav);
