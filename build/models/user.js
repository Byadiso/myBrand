"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = require("uuid");

var ObjectId = _mongoose["default"].Schema.ObjectId;
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  role: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});

var user = _mongoose["default"].model("User", userSchema); // module.exports


var _default = user;
exports["default"] = _default;