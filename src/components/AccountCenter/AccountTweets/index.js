import React from "react";
import moment from "moment";
import "moment/locale/fr";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteUserTweet } from "../../../store/actions/user";

import "./AccountTweets.css";

function AccountTweets(props) {
  return (
    <div className="AccountTweets">
      {props.tweets &&
        props.tweets.map((tweet) => (
          <div className="AccountTweet" key={tweet._id}>
            <Link
              href={`/user/${props.profile.username}`}
              to={`/user/${props.profile.username}`}
            >
              <span className="AccountTweet-name">{props.profile.name}</span>
              <span className="AccountTweet-username">
                @{props.profile.username}
              </span>
            </Link>
            <span className="AccountTweet-bullet">•</span>
            <span className="AccountTweet-tweetedAt">
              {moment(tweet.tweetedAt).locale("fr").calendar()}
            </span>
            <p className="AccountTweet-tweetValue">{tweet.tweetValue}</p>
            <div className="AccountTweet-icons">
              <div className="AccountTweet-icon">
                <i className="fa fa-reply" aria-hidden="true"></i>
                {tweet.replies.length > 0 && (
                  <span className="AccountTweet-replies">
                    {tweet.replies.length}
                  </span>
                )}
              </div>
              <div className="AccountTweet-icon">
                <i className="fa fa-retweet" aria-hidden="true"></i>
                {tweet.retweets.length > 0 && (
                  <span className="AccountTweet-retweets">
                    {tweet.retweets.length}
                  </span>
                )}
              </div>
              <div className="AccountTweet-icon">
                <i className="fa fa-heart" aria-hidden="true"></i>
                {tweet.likes.length > 0 && (
                  <span className="AccountTweet-likes">
                    {tweet.likes.length}
                  </span>
                )}
              </div>
              <div className="AccountTweet-icon">
                <i
                  className="fa fa-share-alt fa-disabled"
                  aria-hidden="true"
                ></i>
              </div>
              {props.profile.username === props.current.username && (
                <div className="AccountTweet-icon">
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={() => props.deleteUserTweet(tweet._id)}
                  ></i>
                </div>
              )}
            </div>
          </div>
        ))}
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
      deleteUserTweet,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTweets);
