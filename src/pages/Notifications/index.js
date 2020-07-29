import React, { useEffect } from "react";

import "./Notifications.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import Searchbar from "../../components/HomeRight/Searchbar";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Infos from "../../components/HomeRight/Infos";

function Notifications() {
  useEffect(() => {
    document.title = "Twister | Notifications";
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <Nav />
        <div className="row">
          <div className="col m12 l3">
            <AccountNav />
          </div>
          <div className="col m12 l6 centered"></div>
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

export default Notifications;
