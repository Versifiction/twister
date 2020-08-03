import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserInfo } from "../../store/actions/user";
import { toggleProtectedTweets } from "../../store/actions/tweets";

import "./SettingsContent.css";

function SettingsContent(props) {
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    props.getUserInfo(props.current.username);
  }, []);

  useEffect(() => {
    setIsProtected(props.profile.protected || false);
  }, [props.profile]);

  function toggleProtected() {
    setIsProtected(!isProtected);
  }

  function saveSettings() {
    props.toggleProtectedTweets(props.current.id, isProtected);
  }

  return (
    <div className="settings-content">
      <p>
        <label>
          <input
            type="checkbox"
            className="filled-in"
            checked={isProtected}
            onChange={toggleProtected}
          />
          <span>Protéger mes tweets</span>
        </label>
      </p>
      <div className="col s12">
        <div className="centered">
          <input
            type="submit"
            className="btn-large submit-button"
            value="Enregistrer"
            onClick={saveSettings}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  current: state.user.current,
  profile: state.user.profile,
  tweets: state.user.tweets,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUserInfo, toggleProtectedTweets }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContent);
