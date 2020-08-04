import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Account.css";
import Nav from "../../components/Nav";
import AccountNav from "../../components/HomeLeft/AccountNav";
import AccountCenter from "../../components/AccountCenter";
import Searchbar from "../../components/HomeRight/Searchbar";
import TrendingTopic from "../../components/HomeRight/TrendingTopic";
import Suggestions from "../../components/HomeRight/Suggestions";
import Infos from "../../components/HomeRight/Infos";

function Account(props) {
  useEffect(() => {
    document.title = `Twister | ${props.match.params.username}`;
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <Nav title={props.match.params.username} />
        <div className="row">
          <div className="col s12 l3">
            <AccountNav />
          </div>
          <div className="col s12 l6 centered">
            <AccountCenter urlName={props.match.params.username} />
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

const mapStateToProps = (state) => ({
  username: state.user.current.username,
});

export default connect(mapStateToProps)(Account);
