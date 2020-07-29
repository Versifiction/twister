/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  tweetValue: {
    type: String,
    required: true,
  },
  writerId: {
    type: String,
    required: true,
  },
  writerName: String,
  writerUsername: String,
  hasSurvey: Boolean,
  hasGif: Boolean,
  hasPicture: Boolean,
  replies: Array,
  retweets: Array,
  likes: Array,
  tweetedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tweet = mongoose.model("tweets", TweetSchema);
