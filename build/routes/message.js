"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth.js");

var _message = require("../controllers/message.js");

var _user = require("../controllers/user.js");

var _auth2 = require("../middlewares/auth.js");

var _checkerros = require("../middlewares/checkerros.js");

var router = _express["default"].Router();

// router.post("/v1/message/create/", create);
router["delete"]("/v1/message/:messageId/", _auth2.verifyToken, _auth.requireSignin, _auth.isAdmin, _message.remove); // router.put("/v1/message/:messageId/", isAdmin, update);

router.get("/v1/message/:messageId", _message.read);
router.get("/v1/messages", _message.list);
router.get("/v1/message/", _message.listByUser);
router.param("userId", _user.userById);
router.param("messageId", _message.messageById);
var _default = router;
exports["default"] = _default;