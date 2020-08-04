import React, { useEffect } from "react";

import "./Explore.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import Searchbar from "../../components/HomeRight/Searchbar";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Infos from "../../components/HomeRight/Infos";
import Suggestions from "../../components/HomeRight/Suggestions";

function Explore() {
  useEffect(() => {
    document.title = "Twister | Explore";
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <Nav title="Explorer" />
        <div className="row">
          <div className="col m12 l3">
            <AccountNav />
          </div>
          <div className="col m12 l6 centered"></div>
          <div className="col m12 l3">
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

export default Explore;
