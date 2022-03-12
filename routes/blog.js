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

router.post("/blogs/create/:userId", requireSignin, isAdmin, create);
router.delete("/blogs/:blogId/:userId", requireSignin, isAdmin, remove);
router.put("/blogs/:blogId/:userId", requireSignin, isAdmin, update);
router.get("/blogs/:blogId", read);
router.get("/blogs", list);
router.get("/blogs/search", listSearch);
router.get("/blogs/related/:blogId", listRelated);
router.get("/blogs/categories", listCategories);
router.post("/blogs/by/search", listBySearch);
router.get("/blogs/:userId", listByUser);
router.get("/blog/photo/:blogId", photo);

// comments
router.put("/blogs/:blogId/comment/:userId", requireSignin, comment);
router.put("/blogs/:blogId/uncomment", requireSignin, uncomment);
router.put("/blogs/:blogId/updatecomment", requireSignin, updateComment);

router.param("userId", userById);
router.param("blogId", blogById);

export default router;
