import React from "react";
import { connect } from "react-redux";

import "./Accueil.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import Feed from "../../components/HomeCenter/Feed";
import Searchbar from "../../components/HomeRight/Searchbar";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Infos from "../../components/HomeRight/Infos";
import NotConnected from "../../components/NotConnected";

function Accueil({ isConnected }) {
  return (
    <div className="Accueil">
      {isConnected ? (
        <div class="container">
          <Nav />
          <div class="row">
            <div class="col m12 l3">
              <AccountNav />
            </div>
            <div class="col m12 l6 centered">
              <Feed />
            </div>
            <div class="col m12 l3">
              <Searchbar />
              <TrendingTopic />
              <Infos />
            </div>
          </div>
        </div>
      ) : (
        <NotConnected />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isConnected: state.user.isConnected,
});

export default connect(mapStateToProps)(Accueil);
