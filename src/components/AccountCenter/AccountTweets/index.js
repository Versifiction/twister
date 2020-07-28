import React from "react";
import moment from "moment";
import "moment/locale/fr";

import "./AccountTweets.css";

function AccountTweets(props) {
  return (
    <div className="AccountTweets">
      {props.tweets &&
        props.tweets.map((tweet) => (
          <div className="AccountTweet">
            <span className="AccountTweet-name">{props.name}</span>
            <span className="AccountTweet-username">@{props.username}</span>
            <span className="AccountTweet-bullet">•</span>
            <span className="AccountTweet-tweetedAt">
              {moment(tweet.tweetedAt).locale("fr").calendar()}
            </span>
            <p className="AccountTweet-tweetValue">{tweet.tweetValue}</p>
          </div>
        ))}
    </div>
  );
}

export default AccountTweets;
