import React, { useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFeedUser } from "../../../store/actions/user";

import "./Feed.css";

function Feed(props) {
  useEffect(() => {
    props.getFeedUser(props.current.id);
  }, []);

  return (
    <div className="Feed">
      {props.tweets &&
        props.tweets.map((tweet) => (
          <div className="AccountTweet" key={tweet._id}>
            <span className="AccountTweet-name">{tweet.writerName}</span>
            <span className="AccountTweet-username">
              @{tweet.writerUsername}
            </span>
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
      getFeedUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
