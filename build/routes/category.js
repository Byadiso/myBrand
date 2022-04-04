"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth.js");

var _category = require("../controllers/category.js");

var _user = require("../controllers/user.js");

var router = _express["default"].Router(); //for categories routers


router.get("/v1/category/:categoryId", _category.read);
router.post("/v1/category/create/", _auth.requireSignin, _auth.isAdmin, _category.create);
router["delete"]("/v1/category/:categoryId/", _auth.requireSignin, _auth.isAdmin, _category.remove);
router.put("/v1/category/:categoryId/", _auth.requireSignin, _auth.isAdmin, _category.update);
router.get("/v1/categories", _category.list);
router.get("/v1/categories/:categoryId", _category.read);
router.param("userId", _user.userById);
router.param("categoryId", _category.categoryById);
var _default = router;
exports["default"] = _default;