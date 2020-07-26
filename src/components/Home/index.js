import React from "react";

import "./Home.css";
import Nav from "../Nav";
import AccountNav from "../HomeLeft/AccountNav";
import Feed from "../HomeCenter/Feed";
import Searchbar from "../HomeRight/Searchbar";
import TrendingTopic from "../HomeRight/TrendingTopic";
import Infos from "../HomeRight/Infos";

function Home() {
  return (
    <div className="Home">
      <div className="container">
        <Nav />
        <div className="row">
          <div className="col m12 l3">
            <AccountNav />
          </div>
          <div className="col m12 l6 centered">
            <Feed />
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

export default Home;
