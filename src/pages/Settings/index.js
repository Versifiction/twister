import React, { useEffect } from "react";

import "./Settings.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import AccountTweets from "../../components/AccountCenter/AccountTweets";
import Searchbar from "../../components/HomeRight/Searchbar";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Infos from "../../components/HomeRight/Infos";

function Settings() {
  useEffect(() => {
    document.title = "Twister | Settings";
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <Nav />
        <div className="row">
          <div className="col m12 l3">
            <AccountNav />
          </div>
          <div className="col m12 l6 centered">
            <AccountTweets />
          </div>
          <div className="col m12 l3">
            <Searchbar />
            <TrendingTopic />
            <Infos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
