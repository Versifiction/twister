import React from "react";

import "./TweetDetailContent.css";

function TweetDetailContent(props) {
  return (
    <div className="TweetDetail">
      <p>Tweet {props.tweetId}</p>
    </div>
  );
}

export default TweetDetailContent;
