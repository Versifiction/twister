const express = require("express");
const cors = require("cors");

const router = express.Router();
let Tweet = require("../../models/Tweet");

const whitelist = ["http://localhost:3000", "http://localhost:5000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

router.post("/new-tweet", cors(corsOptions), async function (req, res) {
  const newTweet = new Tweet({
    tweetValue: req.body.tweetValue,
    writerId: req.body.writerId,
    hasSurvey: false,
    hasGif: false,
    hasPicture: false,
    replies: [],
    retweets: [],
    likes: [],
    tweetedAt: new Date(),
  });

  newTweet
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

router.get("/:id", cors(corsOptions), async function (req, res) {
  const tweets = await Tweet.find({ writerId: req.params.id }).sort({
    tweetedAt: -1,
  });
  res.send(tweets);
});

module.exports = router;
