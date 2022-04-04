"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth.js");

var _blog = require("../controllers/blog.js");

var _user = require("../controllers/user.js");

var _auth2 = require("../middlewares/auth.js");

var _checkerros = require("../middlewares/checkerros.js");

var _index = require("../validator/index.js");

var router = _express["default"].Router();

// router.post(
//   "/v1/blog/create/",
//   verifyToken,
//   requireSignin,
//   isAdmin,
//   create
// );
router["delete"]("/v1/blogs/:blogId/", _auth2.verifyToken, _auth.requireSignin, _auth.isAdmin, _blog.remove); // router.put("/v1/blogs/:blogId/", verifyToken, isAdmin, update);

router.get("/v1/blogs/:blogId", _blog.read);
router.get("/v1/blogs", _blog.list);
router.get("/v1/blogs/search", _blog.listSearch);
router.get("/v1/blogs/related/:blogId", _blog.listRelated);
router.get("/v1/blogs/categories", _blog.listCategories);
router.post("/v1/blogs/by/search", _blog.listBySearch);
router.get("/v1/blogs/", _blog.listByUser);
router.get("/v1/blog/photo/:blogId", _blog.photo); // comments

router.post("/v1/blogs/:blogId/comments/", _auth2.verifyToken, _auth.isAuth, _auth.requireSignin, _blog.comment);
router.put("/v1/blogs/:blogId/comments/:commentId", _auth2.verifyToken, _auth.requireSignin, _blog.uncomment);
router.put("/v1/blogs/:blogId/updatecomment/", _auth2.verifyToken, _auth.requireSignin, _blog.updateComment);
router.param("userId", _user.userById);
router.param("blogId", _blog.blogById);
var _default = router;
exports["default"] = _default;