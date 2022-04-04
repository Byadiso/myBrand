"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _user = _interopRequireDefault(require("../models/user.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

// for authorization check
var verifyToken = function verifyToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "A token is required for authentication"
    });
  }

  token = token.split(" ");

  try {
    var decoded = _jsonwebtoken["default"].verify(token[1], process.env.JWT_SECRET); // console.log(decoded);


    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      message: "Received invalid token"
    });
  }

  return next();
};

exports.verifyToken = verifyToken;