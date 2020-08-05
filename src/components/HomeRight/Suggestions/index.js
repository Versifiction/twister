import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSuggestions } from "../../../store/actions/user";

import "./Suggestions.css";

function Suggestions(props) {
  useEffect(() => {
    props.getSuggestions();
  }, []);

  return (
    <div className="trending-topic">
      <div className="trending-topic-before padding">
        <span>Suggestions</span>
      </div>
      {props.suggestions &&
        props.suggestions.slice(0, 5).map((data) => (
          <div key={data._id} className="trending-topic-content padding">
            <div className="trending-topic-line">
              <Link
                href={`/user/${data.username}`}
                to={`/user/${data.username}`}
              >
                <span className="AccountTweet-name">{data.name}</span>
                <span className="AccountTweet-username">@{data.username}</span>
              </Link>
            </div>
            <div className="trending-topic-libelle">
              <p>{data.biography}</p>
            </div>
          </div>
        ))}
      <div
        className="see-all trending-topic-after padding"
        onClick={() => props.getSuggestions()}
      >
        En avoir d'autres
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  suggestions: state.user.suggestions,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getSuggestions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
