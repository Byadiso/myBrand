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
// const { blogById} = require('../controllers/blog');

router.post("/blog/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/blog/:blogId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/blog/:blogId/:userId", requireSignin, isAuth, isAdmin, update);
router.get("/blog/:blogId", read);
router.get("/blogs", list);
router.get("/blogs/search", listSearch);
router.get("/blogs/related/:blogId", listRelated);
router.get("/blogs/categories", listCategories);
router.post("/blogs/by/search", listBySearch);
router.get("/blogs/:userId", listByUser);
router.get("/blog/photo/:blogId", photo);

// comments
router.put("/blog/:blogId/comment/:userId", requireSignin, comment);
router.put("/blog/uncomment", requireSignin, uncomment);
router.put("/blog/updatecomment", requireSignin, updateComment);

router.param("userId", userById);
router.param("blogId", blogById);

export default router;
