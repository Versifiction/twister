const express = require("express");
const cors = require("cors");

const router = express.Router();
let Tweet = require("../../models/Tweet");
let User = require("../../models/User");

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

// route pour poster un nouveau tweet
router.post("/new-tweet", cors(corsOptions), async function (req, res) {
  const newTweet = new Tweet({
    tweetValue: req.body.tweetValue,
    writerId: req.body.writerId,
    writerName: req.body.writerName,
    writerUsername: req.body.writerUsername,
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

// route pour avoir le détail d'un tweet
router.get("/:id", async function (req, res) {
  const tweet = await Tweet.find({ _id: req.params.id });

  res.send(tweet);
});

// route pour avoir les tweets d'un utilisateur + ses retweets (page Account -> /user/:user)
router.get("/user/:id", cors(corsOptions), async function (req, res) {
  const userTweets = await Tweet.find({ writerId: req.params.id }).sort({
    tweetedAt: -1,
  });

  const userRt = await User.find({ _id: req.params.id }, { retweets: 1 });

  const userRetweets = await Tweet.find({
    _id: { $in: userRt[0].retweets },
  }).sort({
    tweetedAt: -1,
  });

  const userTweetsAndRetweets = userTweets.concat(userRetweets);

  const sortedUserTweetsAndRetweets = userTweetsAndRetweets.sort((a, b) => {
    const dateA = new Date(a.tweetedAt);
    const dateB = new Date(b.tweetedAt);
    return dateA - dateB;
  });

  res.send(sortedUserTweetsAndRetweets.reverse());
});

// route pour avoir les tweets + les retweets des abonnements d'un utilisateur (page Home -> /home)
router.get("/following/:id", cors(corsOptions), async function (req, res) {
  const following = await User.find(
    { _id: req.params.id },
    { following: 1, _id: 0 }
  );

  following[0].following.push(req.params.id);

  const followingTweets = await Tweet.find({
    writerId: { $in: following[0].following },
  }).sort({
    tweetedAt: -1,
  });

  res.send(followingTweets);
});

// route pour supprimer un de ses tweets
router.delete("/delete/:id", cors(corsOptions), async function (req, res) {
  const tweets = await Tweet.findByIdAndRemove({ _id: req.params.id });
  res.send(tweets);
});

// route pour liker un tweet
router.post("/like/:idtweet", cors(corsOptions), async function (req, res) {
  const currentUser = req.body.idUser;
  const idTweet = req.params.idtweet;

  const user = await User.updateOne(
    { _id: currentUser },
    { $addToSet: { likes: idTweet } }
  );

  const tweet = await Tweet.updateOne(
    { _id: idTweet },
    { $addToSet: { likes: currentUser } }
  );

  res.send(user);
});

// route pour retweeter un tweet
router.post("/retweet/:idtweet", cors(corsOptions), async function (req, res) {
  const currentUser = req.body.idUser;
  const idTweet = req.params.idtweet;

  const user = await User.updateOne(
    { _id: currentUser },
    { $addToSet: { retweets: idTweet } }
  );

  const tweet = await Tweet.updateOne(
    { _id: idTweet },
    { $addToSet: { retweets: currentUser } }
  );

  res.send(user);
});

// route pour déliker un tweet
router.post("/unlike/:idtweet", cors(corsOptions), async function (req, res) {
  const currentUser = req.body.idUser;
  const idTweet = req.params.idtweet;

  const user = await User.updateOne(
    { _id: currentUser },
    { $pull: { likes: idTweet } }
  );

  const tweet = await Tweet.updateOne(
    { _id: idTweet },
    { $pull: { likes: currentUser } }
  );

  res.send(user);
});

// route pour déretweeter un tweet
router.post("/unretweet/:idtweet", cors(corsOptions), async function (
  req,
  res
) {
  const currentUser = req.body.idUser;
  const idTweet = req.params.idtweet;

  const user = await User.updateOne(
    { _id: currentUser },
    { $pull: { retweets: idTweet } }
  );

  const tweet = await Tweet.updateOne(
    { _id: idTweet },
    { $pull: { retweets: currentUser } }
  );

  res.send(user);
});

// route pour protéger ses tweets
router.post("/protected", cors(corsOptions), async function (req, res) {
  const currentUser = req.body.idUser;
  const isProtected = req.body.isProtected;

  const user = await User.updateOne(
    { _id: currentUser },
    { protected: isProtected }
  );

  res.send(user);
});

// route pour épingler un tweet
router.post("/pin", cors(corsOptions), async function (req, res) {
  const currentUser = req.body.idUser;
  const idTweet = req.body.idTweet;

  const user = await User.updateOne(
    { _id: currentUser },
    { pinnedTweet: idTweet }
  );

  res.send(user);
});

// route pour déépingler un tweet
router.post("/unpin", cors(corsOptions), async function (req, res) {
  const currentUser = req.body.idUser;

  const user = await User.updateOne({ _id: currentUser }, { pinnedTweet: "" });

  res.send(user);
});

module.exports = router;
