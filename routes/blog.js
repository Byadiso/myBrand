import express from "express";
const router = express.Router();

import { requireSignin, isAuth, isAdmin } from "../controllers/auth.js";
import {
  create,
  blogById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
  photo,
  comment,
  uncomment,
  updateComment,
  listByUser,
  listSingleBlog,
} from "../controllers/blog.js";

import { userById } from "../controllers/user.js";
import { verifyToken } from "../middlewares/auth.js";
// import { UpdateViews } from "../middlewares/blog.js";
import { mongooseErrorHandler } from "../middlewares/checkerros.js";
import { createBlogValidator } from "../validator/index.js";

router.post(
  "/v1/blog/create/",
  verifyToken,

  requireSignin,
  isAdmin,
  create
);
router.delete(
  "/v1/blogs/:blogId/",
  verifyToken,
  requireSignin,
  isAdmin,
  remove
);
router.put("/v1/blogs/:blogId/", verifyToken, isAdmin, update);
router.get("/v1/blogs/:blogId", read);
router.get("/v1/blogs", list);
router.get("/v1/blogs/search", listSearch);
router.get("/v1/blogs/related/:blogId", listRelated);
router.get("/v1/blogs/categories", listCategories);
router.post("/v1/blogs/by/search", listBySearch);
router.get("/v1/blogs/", listByUser);
router.get("/v1/blog/photo/:blogId", photo);

// comments
router.post(
  "/v1/blogs/:blogId/comments/",
  verifyToken,
  isAuth,
  requireSignin,
  comment
);
router.put(
  "/v1/blogs/:blogId/comments/:commentId",
  verifyToken,
  requireSignin,
  uncomment
);
router.put(
  "/v1/blogs/:blogId/updatecomment/",
  verifyToken,
  requireSignin,
  updateComment
);

router.param("userId", userById);
router.param("blogId", blogById);

export default router;
