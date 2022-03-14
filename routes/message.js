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
import { mongooseErrorHandler } from "../middlewares/checkerros.js";

router.post("/message/create/", verifyToken, requireSignin, isAdmin, create);
router.delete("/message/:blogId/", verifyToken, requireSignin, isAdmin, remove);
router.put("/message/:blogId/", verifyToken, requireSignin, isAdmin, update);
router.get("/message/:blogId", read);
router.get("/message", list);
router.get("/message/search", listSearch);
router.get("/message/related/:blogId", listRelated);
router.get("/message/categories", listCategories);
router.post("/message/by/search", listBySearch);
router.get("/message/", listByUser);
router.get("/blog/photo/:blogId", photo);

// comments
router.post(
  "/message/:blogId/comments/",
  verifyToken,
  isAuth,
  requireSignin,
  comment
);
router.put(
  "/message/:blogId/comments/:commentId",
  verifyToken,
  requireSignin,
  uncomment
);
router.put(
  "/message/:blogId/updatecomment/",
  verifyToken,
  requireSignin,
  updateComment
);

router.param("userId", userById);
router.param("blogId", blogById);

export default router;
