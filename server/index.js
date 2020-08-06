const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const moment = require("moment");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const port = process.env.SERVER_PORT || 5000;
const app = express();
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const server = app.listen(port);
const io = require("socket.io").listen(server);
const url = require("./config/db_url").url;

require("dotenv").config();
// require("./config/passport")(passport);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://ofilms.herokuapp.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

let Tweet = require("./models/Tweet");

app.use(cors());
// app.options("*", cors(corsOptions));
// app.use(limiter);
app.use(morgan("tiny"));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.get("/", function (req, res) {
  res.send(
    `Bienvenue sur l'API de Twister. Nous sommes le ${moment(new Date())
      .locale("fr")
      .format("LLLL")}`
  );
});

app.get("/ping", function (req, res) {
  res.send("pong");
});

io.on("connection", function (socket) {
  socket.on("send tweet", async function (tweet) {
    try {
      io.emit("send tweet", tweet);
      const sent = await Tweet.create(tweet, function (err, res) {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
    }
  });
});

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => () =>
    console.log(
      `Le serveur tourne sur le port ${port} et la connexion a la base de données est OK !`
    )
  )
  .catch((err) => console.log(err));
