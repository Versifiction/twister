const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const isEmpty = require("is-empty");
const keys = require("../../config/keys");
const multer = require("multer");
const fs = require("fs-extra");
const url = require("../../config/db_url").url;
const ObjectId = require("mongodb").ObjectId;
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// const validateResetPassword = require("../../validation/reset");

const router = express.Router();
let User = require("../../models/User");
let Tweet = require("../../models/Tweet");
const BCRYPT_SALT_ROUNDS = 12;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// const whitelist = ["http://localhost:3000", "http://localhost:5000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// route pour avoir tous les utilisateurs
router.get("/getAll", async function (req, res) {
  const users = await User.find({});
  res.send(users);
});

// route pour avoir 3 utilisateurs au hasard
router.get("/getRandom", async function (req, res) {
  const users = await User.aggregate([{ $sample: { size: 3 } }]);
  res.send(users);
});

// route pour éditer la bio et le nom d'un utilisateur
router.post("/editBioAndName", async function (req, res) {
  const user1 = await User.updateOne(
    { _id: req.body.obj.id },
    { name: req.body.obj.name, biography: req.body.obj.biography }
  );

  res.send(user1);
});

// route pour éditer la bannière d'un utilisateur
router.post(
  "/editBanner/:id",

  upload.single("banner"),
  async function (req, res) {
    const img = fs.readFileSync(req.file.path);
    const encode_image = img.toString("base64");

    const finalImg = {
      contentType: req.file.mimetype,
      image: new Buffer(encode_image, "base64"),
    };

    const user1 = await User.updateOne(
      { _id: req.params.id },
      {
        banner: finalImg.image,
        bannerType: finalImg.contentType,
      }
    );

    res.send(user1);
  }
);

// route pour éditer la photo d'un utilisateur
router.post("/editPicture/:id", upload.single("picture"), async function (
  req,
  res
) {
  const img = fs.readFileSync(req.file.path);
  const encode_image = img.toString("base64");

  const finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_image, "base64"),
  };

  const user1 = await User.updateOne(
    { _id: req.params.id },
    {
      profilePicture: finalImg.image,
      profilePictureType: finalImg.contentType,
    }
  );

  res.send(user1);
});

// route pour avoir la photo d'un utilisateur
router.get("/picture/:id", function (req, res) {
  User.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) return console.log(err);
    res.contentType(result.profilePictureType);
    res.send(Buffer.from(result.profilePicture.buffer, "base64"));
  });
});

// route pour avoir la bannière d'un utilisateur
router.get("/banner/:id", function (req, res) {
  User.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) return console.log(err);
    res.contentType(result.bannerType);
    res.send(Buffer.from(result.banner.buffer, "base64"));
  });
});

// route pour avoir les infos d'un utilisateur
router.get("/user/:username", async function (req, res) {
  const user = await User.find(
    { username: req.params.username },
    { password: 0 }
  );
  res.send(user);
});

// route pour follow un utilisateur
router.post("/user/follow/:id", async function (req, res) {
  const userToFollow = req.body.idToFollow;
  const currentUser = req.params.id;

  const user1 = await User.updateOne(
    { _id: currentUser },
    { $addToSet: { following: userToFollow } }
  );

  const user2 = await User.updateOne(
    { _id: userToFollow },
    { $addToSet: { followers: currentUser } }
  );

  res.send(user1);
});

// route pour unfollow un utilisateur
router.post("/user/unfollow/:id", async function (req, res) {
  const userToUnfollow = req.body.idToUnfollow;
  const currentUser = req.params.id;

  const user1 = await User.updateOne(
    { _id: currentUser },
    { $pull: { following: userToUnfollow } }
  );

  const user2 = await User.updateOne(
    { _id: userToUnfollow },
    { $pull: { followers: currentUser } }
  );

  res.send(user1);
});

// route pour s'inscrire (page Inscription -> /inscription)
router.post("/register", async function (req, res) {
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
          bannerType: "",
          profilePicture: "",
          profilePictureType: "",
          pinnedTweet: "",
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

// route pour se connecter (page Connexion -> /connexion)
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "L'adresse e-mail rentrée n'existe pas dans nos systèmes";

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
        return res.status(400).json(errors);
      }
    });
  });

  return {
    errors,
    isValid: isEmpty(errors),
  };
});

module.exports = router;
