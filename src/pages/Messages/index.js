import React, { useEffect } from "react";

import "./Messages.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import Searchbar from "../../components/HomeRight/Searchbar";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Suggestions from "../../components/HomeRight/Suggestions";
import Infos from "../../components/HomeRight/Infos";

function Messages() {
  useEffect(() => {
    document.title = "Twister | Messages";
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <Nav title="Messages" />
        <div className="row">
          <div className="col s12 l3">
            <AccountNav />
          </div>
          <div className="col s12 l6 centered"></div>
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

export default Messages;
