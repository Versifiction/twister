import React from "react";
import moment from "moment";
import "moment/locale/fr";

import "./AccountTweets.css";

function AccountTweets(props) {
  return (
    <div className="AccountTweets">
      {props.tweets &&
        props.tweets.map((tweet) => (
          <>
            <span>{props.username}</span>
            <span>{moment(tweet.tweetedAt).locale("fr").calendar()}</span>
            <p>{tweet.tweetValue}</p>
          </>
        ))}
    </div>
  );
}

export default AccountTweets;
