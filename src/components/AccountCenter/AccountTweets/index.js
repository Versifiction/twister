import React from "react";
import moment from "moment";
import "moment/locale/fr";

import "./AccountTweets.css";

function AccountTweets(props) {
  return (
    <div className="AccountTweets">
      {props.tweets &&
        props.tweets.map((tweet) => (
          <div className="AccountTweet" key={tweet._id}>
            <span className="AccountTweet-name">{props.name}</span>
            <span className="AccountTweet-username">@{props.username}</span>
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
            </div>
          </div>
        ))}
    </div>
  );
}

export default AccountTweets;
