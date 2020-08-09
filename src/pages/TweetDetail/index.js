import React from "react";

import "./TweetDetail.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import TweetDetailContent from "../../components/TweetDetailContent";
import Searchbar from "../../components/HomeRight/Searchbar";
import Suggestions from "../../components/HomeRight/Suggestions";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Infos from "../../components/HomeRight/Infos";

function TweetDetail(props) {
  return (
    <div className="Home">
      <div className="container">
        <Nav title="Tweet" />
        <div className="row">
          <div className="col s12 l3">
            <AccountNav />
          </div>
          <div className="col s12 l6">
            <TweetDetailContent tweetId={props.match.params.id} />
          </div>
          <div className="col s12 l3">
            <Searchbar />
            <TrendingTopic />
            <Suggestions />
            <Infos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetDetail;
