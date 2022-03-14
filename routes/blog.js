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
} from "../controllers/blog.js";

import { userById } from "../controllers/user.js";
import { verifyToken } from "../middlewares/auth.js";
import { UpdateViews } from "../middlewares/blog.js";
import { mongooseErrorHandler } from "../middlewares/checkerros.js";

router.post("/blogs/create/", verifyToken, requireSignin, isAdmin, create);
router.delete("/blogs/:blogId/", verifyToken, requireSignin, isAdmin, remove);
router.put("/blogs/:blogId/", verifyToken, requireSignin, isAdmin, update);
router.get("/blogs/:blogId", UpdateViews, read);
router.get("/blogs", list);
router.get("/blogs/search", listSearch);
router.get("/blogs/related/:blogId", listRelated);
router.get("/blogs/categories", listCategories);
router.post("/blogs/by/search", listBySearch);
router.get("/blogs/", listByUser);
router.get("/blog/photo/:blogId", photo);

// comments
router.post(
  "/blogs/:blogId/comments/",
  verifyToken,
  isAuth,
  requireSignin,
  comment
);
router.put(
  "/blogs/:blogId/comments/:commentId",
  verifyToken,
  requireSignin,
  uncomment
);
router.put(
  "/blogs/:blogId/updatecomment/",
  verifyToken,
  requireSignin,
  updateComment
);

router.param("userId", userById);
router.param("blogId", blogById);

export default router;
