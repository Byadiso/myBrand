"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var ObjectId = _mongoose["default"].Schema.ObjectId;
var messageSchema = new _mongoose["default"].Schema({
  sender: {
    type: String,
    trim: true,
    required: [true, "Your name is required"]
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Your email is required"],
    maxlength: 2000
  },
  content: {
    type: String,
    trim: true,
    required: [true, "Content is required"],
    minLength: [4, "title should be at least four characters"]
  }
}, {
  timestamps: true
});

var Message = _mongoose["default"].model("Message", messageSchema);

var _default = Message;
exports["default"] = _default;