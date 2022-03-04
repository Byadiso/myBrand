import express from "express";
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  create,
  blogById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listSearch,
  photo,
  comment,
  uncomment,
  updateComment,
} = require("../controllers/blog");
const { userById } = require("../controllers/user");
// const { blogById} = require('../controllers/blog');

router.post("/v1/blog/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/v1/blog/:blogId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put("/v1/blog/:blogId/:userId", requireSignin, isAuth, isAdmin, update);
router.get("/v1/blog/:blogId", read);
router.get("/v1/blogs", list);
router.get("/v1/blogs/search", listSearch);
router.get("/v1/blogs/related/:blogId", listRelated);
router.get("/v1/blogs/categories", listCategories);
router.post("/v1/blogs/by/search", listBySearch);
router.get("/v1/blogs/:userId", listByUser);
router.get("/v1/blog/photo/:blogId", photo);

// comments
router.put("/v1/blog/comment", requireSignin, comment);
router.put("/v1/blog/uncomment", requireSignin, uncomment);
router.put("/v1/blog/updatecomment", requireSignin, updateComment);

router.param("userId", userById);
router.param("blogId", blogById);

module.exports = router;
