import React, { useEffect } from "react";

import "./Lists.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import Searchbar from "../../components/HomeRight/Searchbar";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Infos from "../../components/HomeRight/Infos";

function Lists() {
  useEffect(() => {
    document.title = "Twister | Lists";
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <Nav />
        <div className="row">
          <div className="col s12 l3">
            <AccountNav />
          </div>
          <div className="col s12 l6 centered"></div>
          <div className="col s12 l3">
            <Searchbar />
            <TrendingTopic />
            <Infos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lists;
