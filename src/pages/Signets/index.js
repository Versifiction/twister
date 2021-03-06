import React, { useEffect } from "react";

import "./Signets.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import Searchbar from "../../components/HomeRight/Searchbar";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Infos from "../../components/HomeRight/Infos";

function Signets() {
  useEffect(() => {
    document.title = "Twister | Signets";
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <Nav title="Signets" />
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

export default Signets;
