"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signout = exports.signin = exports.requireSignin = exports.isAuth = exports.isAdmin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _dbErroHandler = require("../helper/dbErroHandler.js");

// for authorization check
// let uuidv1 = require('uuidv1');
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var name, username, email, password, user, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = req.body.name;
            username = req.body.username;
            email = req.body.email;
            password = req.body.password;

            if (!(name && email && password && username)) {
              _context.next = 19;
              break;
            }

            _context.next = 7;
            return _user["default"].findOne({
              $or: [{
                username: username
              }, {
                email: email
              }]
            })["catch"](function (error) {
              console.log(error);
              res.status(400).json({
                error: "Something went wrong"
              });
            });

          case 7:
            user = _context.sent;

            if (!(user == null)) {
              _context.next = 16;
              break;
            }

            // No user found
            data = req.body;
            _context.next = 12;
            return _bcrypt["default"].hash(password, _bcrypt["default"].genSaltSync(10));

          case 12:
            data.password = _context.sent;

            _user["default"].create(data).then(function (user) {
              // req.session.user = user;
              user.password = undefined;
              res.status(200).json({
                User: user,
                message: "account registered Successfully"
              });
            });

            _context.next = 17;
            break;

          case 16:
            // User found
            if (email == user.email) {
              res.status(400).json({
                error: "email in user"
              });
            } else {
              res.status(400).json({
                error: "username  already in user."
              });
            }

          case 17:
            _context.next = 21;
            break;

          case 19:
            if (!name) {
              res.status(400).json({
                error: "name is missing",
                user: req.body
              });
            }

            if (!email) {
              res.status(400).json({
                error: "email is missing",
                user: req.body
              });

              if (!password) {
                res.status(400).json({
                  error: "password is required",
                  user: req.body
                });

                if (!username) {
                  res.status(400).json({
                    error: "username is missing",
                    user: req.body
                  });
                }
              }
            }

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var signin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user, result, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.body.email && req.body.password)) {
              _context2.next = 13;
              break;
            }

            _context2.next = 3;
            return _user["default"].findOne({
              $or: [{
                username: req.body.username
              }, {
                email: req.body.email
              }]
            })["catch"](function (error) {
              console.log(error);
              res.status(400).json({
                error: "No user with that email or username"
              });
            });

          case 3:
            user = _context2.sent;

            if (!(user != null)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return _bcrypt["default"].compare(req.body.password, user.password);

          case 7:
            result = _context2.sent;

            if (result === true) {
              // req.session.user = user;
              // generate a signed token with uer id and secret
              user.password = undefined;
              token = _jsonwebtoken["default"].sign({
                _id: user._id
              }, "".concat(process.env.JWT_SECRET)); //persist the token as 't' in cookie with expiry date

              res.cookie("t", token, {
                expire: new Date() + 9999
              });
              res.status(200).json({
                token: token,
                message: "user logged in successfully",
                user: user
              });
            }

          case 9:
            if (!(result !== true)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: "Login credentials incorrect!"
            }));

          case 11:
            _context2.next = 14;
            break;

          case 13:
            res.status(404).json({
              error: "Make sure each field has a valid value!"
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signin(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;

var signout = function signout(req, res) {
  res.clearCookie("t");
  res.status(200).json({
    message: "Signout success"
  });
};

exports.signout = signout;
var requireSignin = (0, _expressJwt["default"])({
  // secret: process.env.JWT_SECRET,
  secret: "hgjhjdgdhgjdhglaskdaghnbgfnbgfgfgfg",
  algorithms: ["HS256"],
  // added later
  userBlog: "auth"
});
exports.requireSignin = requireSignin;

var isAuth = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var usertoken, token, decoded, userId, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            usertoken = req.headers.authorization;

            if (!(usertoken === undefined)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              error: "No token found, plz login and try again"
            }));

          case 3:
            token = usertoken.split(" ");
            decoded = _jsonwebtoken["default"].verify(token[1], process.env.JWT_SECRET);
            userId = decoded; // console.log(userId);
            //getting user's details

            _context3.next = 8;
            return _user["default"].findOne({
              _id: userId
            })["catch"](function (error) {
              console.log(error);
              res.status(400).json({
                error: "No user with that email or username"
              });
            });

          case 8:
            user = _context3.sent;

            if (user) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(403).json({
              error: " Access denied,try to sign in and try again"
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isAuth(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.isAuth = isAuth;

var isAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var usertoken, token, decoded, userId, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            usertoken = req.headers.authorization; // console.log(usertoken);

            if (!(usertoken === undefined)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              error: "No token found, plz login and try again"
            }));

          case 3:
            // const usertoken = req.headers.authorization;
            token = usertoken.split(" ");
            decoded = _jsonwebtoken["default"].verify(token[1], process.env.JWT_SECRET);
            userId = decoded; //getting user's details

            _context4.next = 8;
            return _user["default"].findOne({
              _id: userId
            })["catch"](function (error) {
              console.log(error);
              res.status(400).json({
                error: "No user with that email or username"
              });
            });

          case 8:
            user = _context4.sent;

            if (!(user.role === 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(403).json({
              error: " Admin ressource! Access denied"
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function isAdmin(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;