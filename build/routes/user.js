"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user.js");

var _auth = require("../controllers/auth.js");

var router = _express["default"].Router();

router.get("/v1/user/:userId", _auth.requireSignin, _user.read);
router.put("/v1/user/:userId", _auth.requireSignin, _user.update);
router["delete"]("/v1/user/:userId", _auth.requireSignin, _auth.isAdmin, _user.remove); // get all users

router.get("/v1/users/", _auth.requireSignin, _user.listUsers); // photo

router.get("v1/user/photo/:userId", _user.userPhoto);
router.param("userId", _user.userById);
var _default = router;
exports["default"] = _default;