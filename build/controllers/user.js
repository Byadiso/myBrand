"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userPhoto = exports.userById = exports.update = exports.remove = exports.read = exports.listUsers = void 0;

var _user = _interopRequireDefault(require("../models/user.js"));

var _dbErroHandler = require("../helper/dbErroHandler.js");

var userById = function userById(req, res, next, id) {
  _user["default"].findById(id).exec(function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        error: err,
        errors: "User not found"
      });
    }

    req.profile = user;
    next();
  });
};

exports.userById = userById;

var read = function read(req, res) {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.read = read;

var remove = function remove(req, res) {
  var user = req.profile;
  user.remove(function (err, deletedUser) {
    if (err) {
      return res.status(400).json({
        error: (0, _dbErroHandler.errorHandler)(err)
      });
    }

    res.json({
      // deletedCategory,
      message: "User deleted successfully"
    });
  });
};

exports.remove = remove;

var userPhoto = function userPhoto(req, res, next) {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    return res.send(req.profile.photo.data);
  }

  next();
}; //fetch all users from theb database


exports.userPhoto = userPhoto;

var listUsers = function listUsers(req, res) {
  _user["default"].find().select("-photo").exec(function (err, users) {
    if (err) {
      return res.status(400).json({
        error: "Users not found"
      });
    }

    return res.status(200).json({
      users: users,
      message: "all users",
      status: true
    });
  });
};

exports.listUsers = listUsers;

var update = function update(req, res) {
  var user = req.profile;

  _user["default"].findOneAndUpdate({
    _id: user._id
  }, {
    $set: req.body
  }, {
    "new": true
  }, function (err, user) {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized  to perfom this action"
      });
    }

    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({
      user: user,
      message: 'user updated successfully'
    });
  });
};

exports.update = update;