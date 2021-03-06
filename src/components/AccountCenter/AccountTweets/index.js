import React from "react";
import moment from "moment";
import classnames from "classnames";
import "moment/locale/fr";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteUserTweet } from "../../../store/actions/user";
import {
  retweetTweet,
  likeTweet,
  pinTweet,
  unretweetTweet,
  unlikeTweet,
  unpinTweet,
} from "../../../store/actions/tweets";

import "./AccountTweets.css";

function AccountTweets(props) {
  function toggleLike(idTweet, idUser) {
    if (
      props.tweets.filter((t) => t._id === idTweet)[0].likes.includes(idUser)
    ) {
      props.unlikeTweet(idTweet, idUser);
    } else {
      props.likeTweet(idTweet, idUser);
    }
  }

  function toggleRetweet(idTweet, idUser) {
    if (
      props.tweets.filter((t) => t._id === idTweet)[0].retweets.includes(idUser)
    ) {
      props.unretweetTweet(idTweet, idUser);
    } else {
      props.retweetTweet(idTweet, idUser);
    }
  }

  return (
    <div className="AccountTweets">
      {props.profile.pinnedTweet &&
        props.tweets &&
        props.tweets
          .filter((tweet) => tweet._id.toString() === props.profile.pinnedTweet)
          .map((tweet) => (
            <>
              <div className="AccountTweet" key={tweet._id}>
                <Link href={`/tweet/${tweet._id}`} to={`/tweet/${tweet._id}`}>
                  {tweet._id.toString() === props.profile.pinnedTweet && (
                    <div className="isAPin">
                      <i className="fa fa-map-pin isAPin-icon"></i>
                      <p className="AccountTweet-isAPin">
                        {props.profile.name} a épinglé
                      </p>
                    </div>
                  )}
                  <Link
                    href={`/user/${tweet.writerUsername}`}
                    to={`/user/${tweet.writerUsername}`}
                  >
                    <span className="AccountTweet-name">
                      {tweet.writerName}
                    </span>
                    <span className="AccountTweet-username">
                      @{tweet.writerUsername}
                    </span>
                  </Link>
                  <span className="AccountTweet-bullet">•</span>
                  <span className="AccountTweet-tweetedAt">
                    {moment(tweet.tweetedAt).locale("fr").calendar()}
                  </span>
                  <p className="AccountTweet-tweetValue">{tweet.tweetValue}</p>{" "}
                </Link>
                <div className="AccountTweet-icons">
                  <div className="AccountTweet-icon">
                    <i className="fa fa-reply" aria-hidden="true"></i>
                    {tweet.replies.length > 0 && (
                      <span className="AccountTweet-replies">
                        {tweet.replies.length}
                      </span>
                    )}
                  </div>
                  <div className="AccountTweet-icon">
                    <i
                      className={classnames("fa fa-retweet", {
                        retweeted: tweet.retweets.includes(props.current.id),
                      })}
                      onClick={() => toggleRetweet(tweet._id, props.current.id)}
                      aria-hidden="true"
                    ></i>
                    {tweet.retweets.length > 0 && (
                      <span
                        className={classnames("AccountTweet-retweets", {
                          retweeted: tweet.retweets.includes(props.current.id),
                        })}
                      >
                        {tweet.retweets.length}
                      </span>
                    )}
                  </div>
                  <div className="AccountTweet-icon">
                    <i
                      className={classnames("fa fa-heart", {
                        liked: tweet.likes.includes(props.current.id),
                      })}
                      onClick={() => toggleLike(tweet._id, props.current.id)}
                      aria-hidden="true"
                    ></i>
                    {tweet.likes.length > 0 && (
                      <span
                        className={classnames("AccountTweet-likes", {
                          liked: tweet.likes.includes(props.current.id),
                        })}
                      >
                        {tweet.likes.length}
                      </span>
                    )}
                  </div>
                  {tweet.writerId === props.current.id && (
                    <div className="AccountTweet-icon">
                      <i
                        className={classnames("fa fa-map-pin", {
                          pinnedTweet:
                            props.profile.pinnedTweet === tweet._id.toString(),
                        })}
                        aria-hidden="true"
                        onClick={() =>
                          props.profile.pinnedTweet === ""
                            ? props.pinTweet(tweet._id, props.current.id)
                            : props.unpinTweet(props.current.id)
                        }
                      ></i>
                    </div>
                  )}
                  {tweet.writerId === props.current.id && (
                    <div className="AccountTweet-icon">
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        onClick={() => props.deleteUserTweet(tweet._id)}
                      ></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="separate"></div>
            </>
          ))}
      {props.tweets &&
        props.tweets.map((tweet) => (
          <div className="AccountTweet" key={tweet._id}>
            <Link href={`/tweet/${tweet._id}`} to={`/tweet/${tweet._id}`}>
              {props.profile._id !== tweet.writerId && (
                <div className="isARetweet">
                  <i className="fa fa-retweet isARetweet-icon"></i>
                  <p className="AccountTweet-isARetweet">
                    {props.profile.name} a retweeté
                  </p>
                </div>
              )}
              <Link
                href={`/user/${tweet.writerUsername}`}
                to={`/user/${tweet.writerUsername}`}
              >
                <span className="AccountTweet-name">{tweet.writerName}</span>
                <span className="AccountTweet-username">
                  @{tweet.writerUsername}
                </span>
              </Link>
              <span className="AccountTweet-bullet">•</span>
              <span className="AccountTweet-tweetedAt">
                {moment(tweet.tweetedAt).locale("fr").calendar()}
              </span>
              <p className="AccountTweet-tweetValue">{tweet.tweetValue}</p>{" "}
            </Link>
            <div className="AccountTweet-icons">
              <div className="AccountTweet-icon">
                <i className="fa fa-reply" aria-hidden="true"></i>
                {tweet.replies.length > 0 && (
                  <span className="AccountTweet-replies">
                    {tweet.replies.length}
                  </span>
                )}
              </div>
              <div className="AccountTweet-icon">
                <i
                  className={classnames("fa fa-retweet", {
                    retweeted: tweet.retweets.includes(props.current.id),
                  })}
                  onClick={() => toggleRetweet(tweet._id, props.current.id)}
                  aria-hidden="true"
                ></i>
                {tweet.retweets.length > 0 && (
                  <span
                    className={classnames("AccountTweet-retweets", {
                      retweeted: tweet.retweets.includes(props.current.id),
                    })}
                  >
                    {tweet.retweets.length}
                  </span>
                )}
              </div>
              <div className="AccountTweet-icon">
                <i
                  className={classnames("fa fa-heart", {
                    liked: tweet.likes.includes(props.current.id),
                  })}
                  onClick={() => toggleLike(tweet._id, props.current.id)}
                  aria-hidden="true"
                ></i>
                {tweet.likes.length > 0 && (
                  <span
                    className={classnames("AccountTweet-likes", {
                      liked: tweet.likes.includes(props.current.id),
                    })}
                  >
                    {tweet.likes.length}
                  </span>
                )}
              </div>
              {tweet.writerId === props.current.id && (
                <div className="AccountTweet-icon">
                  <i
                    className={classnames("fa fa-map-pin", {
                      pinnedTweet:
                        props.profile.pinnedTweet === tweet._id.toString(),
                    })}
                    aria-hidden="true"
                    onClick={() =>
                      props.profile.pinnedTweet === ""
                        ? props.pinTweet(tweet._id, props.current.id)
                        : props.unpinTweet(props.current.id)
                    }
                  ></i>
                </div>
              )}
              {tweet.writerId === props.current.id && (
                <div className="AccountTweet-icon">
                  <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    onClick={() => props.deleteUserTweet(tweet._id)}
                  ></i>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  current: state.user.current,
  profile: state.user.profile,
  tweets: state.user.tweets,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountTweets);
