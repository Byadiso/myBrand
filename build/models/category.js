"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var categorySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true
  }
}, {
  timestamps: true
});

var category = _mongoose["default"].model("Category", categorySchema); // module.exports


var _default = category;
exports["default"] = _default;