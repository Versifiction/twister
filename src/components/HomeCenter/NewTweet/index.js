import React, { useRef } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  newTweetInputChange,
  resetNewTweetInput,
  sendNewTweet,
} from "../../../store/actions/tweets";

import "./NewTweet.css";

function NewTweet(props) {
  const newTweetInput = useRef(null);

  function focusNewTweetInput() {
    newTweetInput.current.focus();
  }

  function tweet(e) {
    const tweetData = {
      tweetValue: props.newTweet.tweetValue,
      writerId: props.current.id,
      writerName: props.current.name,
      writerUsername: props.current.username,
    };

    // socket.emit("send tweet", tweetData);

    props.sendNewTweet(tweetData);

    props.resetNewTweetInput();
  }

  return (
    <div className="New-Tweet">
      <div>
        <div className="modal-content">
          <textarea
            type="text"
            value={props.newTweet.tweetValue}
            onChange={(e) => props.newTweetInputChange(e.target.value)}
            placeholder="Quoi de neuf ?"
            ref={newTweetInput}
          />
        </div>
        <div className="modal-footer">
          <div className="new-tweet-counter-container-home">
            <div className="new-tweet-counter-home">
              <span
                className={classNames("new-tweet-length", {
                  "new-tweet-length-red":
                    props.newTweet.tweetValue.length > 140,
                })}
              >
                {props.newTweet.tweetValue.length}
              </span>
              <span className="new-tweet-max-length">
                /{props.newTweet.maxLength}
              </span>{" "}
            </div>{" "}
            <button
              className="btn modal-close"
              onClick={(e) => tweet(e)}
              disabled={
                props.newTweet.tweetValue.length === 0 ||
                props.newTweet.tweetValue.length > 140
              }
            >
              Tweeter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  current: state.user.current,
  newTweet: state.newTweet,
  tweets: state.user.tweets,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      newTweetInputChange,
      resetNewTweetInput,
      sendNewTweet,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NewTweet);
