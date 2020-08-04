import React, { useEffect } from "react";

import "./Settings.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import Searchbar from "../../components/HomeRight/Searchbar";
import SettingsContent from "../../components/SettingsContent";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Infos from "../../components/HomeRight/Infos";

function Settings() {
  useEffect(() => {
    document.title = "Twister | Settings";
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <Nav title="Paramètres" />
        <div className="row">
          <div className="col s12 l3">
            <AccountNav />
          </div>
          <div className="col s12 l6">
            <SettingsContent />
          </div>
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

export default Settings;
