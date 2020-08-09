/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  biography: String,
  following: Array,
  followers: Array,
  retweets: Array,
  likes: Array,
  lists: Array,
  banner: Buffer,
  bannerType: String,
  profilePicture: Buffer,
  profilePictureType: String,
  pinnedTweet: String,
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastConnection: Date,
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  protected: Boolean,
  verified: Boolean,
  connected: Boolean,
});

module.exports = User = mongoose.model("users", UserSchema);
