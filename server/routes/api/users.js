const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const isEmpty = require("is-empty");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// const validateResetPassword = require("../../validation/reset");

const router = express.Router();
let User = require("../../models/User");
const BCRYPT_SALT_ROUNDS = 12;

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

router.get("/getAll", cors(corsOptions), async function (req, res) {
  const users = await User.find({});
  res.send(users);
});

router.get("/user/:username", cors(corsOptions), async function (req, res) {
  const user = await User.find(
    { username: req.params.username },
    { password: 0 }
  );
  res.send(user);
});

router.post("/register", cors(corsOptions), async function (req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.find(
    {
      $or: [{ email: req.body.email }, { username: req.body.username }],
    },
    function (err, docs) {
      if (docs.length !== 0) {
        if (docs[0].email === req.body.email) {
          errors.email = "L'adresse email est déjà prise";
          return res
            .status(400)
            .json({ email: "L'adresse email est déjà prise" });
        } else if (docs[0].username === req.body.username) {
          errors.username = "Le pseudo est déjà pris";
          return res.status(400).json({ username: "Le pseudo est déjà pris" });
        }
      } else {
        const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          name: req.body.name,
          password: req.body.password,
          biography: "",
          banner: "",
          profilePicture: "",
          following: [],
          followers: [],
          retweets: [],
          likes: [],
          lists: [],
          protected: false,
          connected: false,
          verified: false,
          resetPasswordToken: null,
          resetPasswordExpires: null,
          creationDate: new Date(),
          lastConnection: "",
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    }
  );

  return {
    errors,
    isValid: isEmpty(errors),
  };
});

router.post("/login", cors(corsOptions), (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "Les identifiants rentrés ne sont pas valides";
      errors.password = "Les identifiants rentrés ne sont pas valides";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
          name: user.name,
        };

        user.updateOne({ lastConnection: new Date() }).then((updatedUser) => {
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 7200,
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        });
      } else {
        errors.password = "Le mot de passe saisi n'est pas correct";
        // return res
        //   .status(400)
        //   .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });

  return {
    errors,
    isValid: isEmpty(errors),
  };
});

module.exports = router;
