import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import expressJwt from "express-jwt"; // for authorization check
// let uuidv1 = require('uuidv1');
import { errorHandler } from "../helper/dbErroHandler.js";

export const signup = async (req, res) => {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  if (name && email && password && username) {
    var user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((error) => {
      console.log(error);
      res.status(400).json({ message: "Something went wrong" });
    });

    if (user == null) {
      // No user found
      var data = req.body;

      data.password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
      User.create(data).then((user) => {
        // req.session.user = user;
        user.password = undefined;
        res.status(200).json({ message: "account registered Successfully" });
      });
    } else {
      // User found
      if (email == user.email) {
        res.status(400).json({ message: "email in user" });
      } else {
        res.status(400).json({ message: "username  already in user." });
      }
    }
  } else {
    // payload.errorMessage = "Make sure each field has a valid value.";
    res.status(400).json({
      message: "Make sure each field has a valid value",
      user: req.body,
    });
  }
};

export const signin = async (req, res, next) => {
  if (req.body.email && req.body.password) {
    var user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    }).catch((error) => {
      console.log(error);
      res.status(400).json({ message: "No user with that email or username" });
    });

    if (user != null) {
      //  user found
      var result = await bcrypt.compare(req.body.password, user.password);

      if (result === true) {
        // req.session.user = user;
        // generate a signed token with uer id and secret
        user.password = undefined;
        const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET}`);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
        res.status(200).json({
          token: token,
          message: "user logged in successfully",
          user: user,
        });
      }
    }
    if (result === false) {
      res.status(400).json({ message: "Login credentials incorrect!" });
    }
  } else {
    res
      .status(404)
      .json({ message: "Make sure each field has a valid value!" });
  }
};

export const signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

export const requireSignin = expressJwt({
  // secret: process.env.JWT_SECRET,
  secret: "hgjhjdgdhgjdhglaskdaghnbgfnbgfgfgfg",
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: " Access denied",
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: " Admin ressource! Access denied",
    });
  }
  next();
};
