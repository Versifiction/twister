import React, { useEffect } from "react";
import moment from "moment";
import classnames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteUserTweet } from "../../store/actions/user";
import {
  getTweetDetail,
  retweetTweet,
  likeTweet,
  pinTweet,
  unretweetTweet,
  unlikeTweet,
  unpinTweet,
} from "../../store/actions/tweets";

import "./TweetDetailContent.css";

function TweetDetailContent(props) {
  useEffect(() => {
    props.getTweetDetail(props.tweetId);
  }, [props.tweetId]);

  function toggleLike(idTweet, idUser) {
    if (props.tweetDetail.likes.includes(idUser)) {
      props.unlikeTweet(idTweet, idUser);
    } else {
      props.likeTweet(idTweet, idUser);
    }
  }

  function toggleRetweet(idTweet, idUser) {
    if (props.tweetDetail.retweets.includes(idUser)) {
      props.unretweetTweet(idTweet, idUser);
    } else {
      props.retweetTweet(idTweet, idUser);
    }
  }

  if (props.tweetDetail.length === 0) {
    return <p>Rien</p>;
  }

  return (
    <div className="TweetDetail">
      <span className="AccountTweet-name">{props.tweetDetail.writerName}</span>
      <span className="AccountTweet-username">
        @{props.tweetDetail.writerUsername}
      </span>
      <span className="AccountTweet-bullet">•</span>
      <span className="AccountTweet-tweetedAt">
        {moment(props.tweetDetail.tweetedAt).locale("fr").calendar()}
      </span>
      <p className="AccountTweet-tweetValue">{props.tweetDetail.tweetValue}</p>
      <div className="AccountTweet-icons">
        <div className="AccountTweet-icon">
          <i className="fa fa-reply" aria-hidden="true"></i>
          {props.tweetDetail.replies &&
            props.tweetDetail.replies.length > 0 && (
              <span className="AccountTweet-replies">
                {props.tweetDetail.replies.length}
              </span>
            )}
        </div>
        <div className="AccountTweet-icon">
          <i
            className={classnames("fa fa-retweet", {
              retweeted:
                props.tweetDetail.retweets &&
                props.tweetDetail.retweets.includes(props.current.id),
            })}
            onClick={() =>
              toggleRetweet(props.tweetDetail._id, props.current.id)
            }
            aria-hidden="true"
          ></i>
          {props.tweetDetail.retweets && props.tweetDetail.retweets.length > 0 && (
            <span
              className={classnames("AccountTweet-retweets", {
                retweeted: props.tweetDetail.retweets.includes(
                  props.current.id
                ),
              })}
            >
              {props.tweetDetail.retweets && props.tweetDetail.retweets.length}
            </span>
          )}
        </div>
        <div className="AccountTweet-icon">
          <i
            className={classnames("fa fa-heart", {
              liked:
                props.tweetDetail.likes &&
                props.tweetDetail.likes.includes(props.current.id),
            })}
            onClick={() => toggleLike(props.tweetDetail._id, props.current.id)}
            aria-hidden="true"
          ></i>
          {props.tweetDetail.likes && props.tweetDetail.likes.length > 0 && (
            <span
              className={classnames("AccountTweet-likes", {
                liked: props.tweetDetail.likes.includes(props.current.id),
              })}
            >
              {props.tweetDetail.likes && props.tweetDetail.likes.length}
            </span>
          )}
        </div>
        {props.tweetDetail.writerId === props.current.id && (
          <div className="AccountTweet-icon">
            <i
              className={classnames("fa fa-map-pin", {
                pinnedTweet:
                  props.tweetDetail.pinnedTweet ===
                  props.tweetDetail._id.toString(),
              })}
              aria-hidden="true"
              onClick={() =>
                props.tweetDetail.pinnedTweet === ""
                  ? props.pinTweet(props.tweetDetail._id, props.current.id)
                  : props.unpinTweet(props.current.id)
              }
            ></i>
          </div>
        )}
        {props.tweetDetail.writerId === props.current.id && (
          <div className="AccountTweet-icon">
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={() => props.deleteUserTweet(props.tweetDetail._id)}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  current: state.user.current,
  profile: state.user.profile,
  tweetDetail: state.user.tweetDetail,
  tweets: state.user.tweets,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTweetDetail,
      deleteUserTweet,
      retweetTweet,
      likeTweet,
      pinTweet,
      unretweetTweet,
      unlikeTweet,
      unpinTweet,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TweetDetailContent);
