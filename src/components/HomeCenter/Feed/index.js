import React, { useEffect } from "react";
import moment from "moment";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TextBlock } from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";
import { deleteUserTweet, getFeedUser } from "../../../store/actions/user";
import {
  retweetTweet,
  likeTweet,
  pinTweet,
  unretweetTweet,
  unlikeTweet,
  unpinTweet,
} from "../../../store/actions/tweets";

import "./Feed.css";
import FeedPlaceholder from "../../Placeholders/Feed";

function Feed(props) {
  useEffect(() => {
    props.getFeedUser(props.current.id);
  }, []);

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

  const awesomePlaceholder = (
    <div>
      <div className="AccountTweet">
        <TextBlock rows={3} color="grey" />
      </div>
      <div className="AccountTweet">
        <TextBlock rows={3} color="grey" />
      </div>
      <div className="AccountTweet">
        <TextBlock rows={3} color="grey" />
      </div>
    </div>
  );

  if (props.loading) {
    return <FeedPlaceholder />;
  }

  return (
    <>
      <div className="separate"></div>
      <div className="Feed">
        {props.tweets.length === 0 && (
          <p className="Feed-NoMessage">
            Il n'y a pas encore de tweet dans votre fil d'actualité !
          </p>
        )}
        <div
          className={classnames({ "Feed-Content": props.tweets.length > 0 })}
        >
          {props.tweets &&
            props.tweets.map((tweet) => (
              <div className="AccountTweet" key={tweet._id}>
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
                <p className="AccountTweet-tweetValue">{tweet.tweetValue}</p>
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
                      aria-hidden="true"
                      onClick={() => toggleRetweet(tweet._id, props.current.id)}
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
                      aria-hidden="true"
                      onClick={() => toggleLike(tweet._id, props.current.id)}
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
                  {tweet.writerUsername === props.current.username && (
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
                  {tweet.writerUsername === props.current.username && (
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
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  current: state.user.current,
  profile: state.user.profile,
  tweets: state.user.tweets,
  loading: state.loading.loadingFeed,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteUserTweet,
      getFeedUser,
      retweetTweet,
      likeTweet,
      pinTweet,
      unretweetTweet,
      unlikeTweet,
      unpinTweet,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
