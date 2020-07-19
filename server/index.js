const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const moment = require("moment");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const port = process.env.PORT || 5000;
const app = express();

require("dotenv").config();
// require("./config/passport")(passport);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors());
app.use(limiter); //
app.use(morgan("tiny"));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());

app.get("/", function (req, res) {
  res.send(
    `Bienvenue sur l'API de Twister. Nous sommes le ${moment(new Date())
      .locale("fr")
      .format("LLLL")}`
  );
});

app.listen(port, () => console.log(`Le serveur tourne sur le port ${port}`));
