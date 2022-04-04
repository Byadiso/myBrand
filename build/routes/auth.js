"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth.js");

var _index = require("../validator/index.js");

var router = _express["default"].Router();

router.post("/v1/signup", _index.userSignupValidator, _auth.signup);
router.post("/v1/login", _index.userLoginValidator, _auth.signin);
router.get("/v1/signout", _auth.signout);
var _default = router;
exports["default"] = _default;