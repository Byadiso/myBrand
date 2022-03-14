import express from "express";
const router = express.Router();

import { requireSignin, isAuth, isAdmin } from "../controllers/auth.js";
import {
  create,
  read,
  remove,
  update,
  list,
  listByUser,
  messageById,
} from "../controllers/message.js";

import { userById } from "../controllers/user.js";
import { verifyToken } from "../middlewares/auth.js";
import { mongooseErrorHandler } from "../middlewares/checkerros.js";

router.post("/message/create/", verifyToken, requireSignin, isAdmin, create);
router.delete(
  "/message/:messageId/",
  verifyToken,
  requireSignin,
  isAdmin,
  remove
);
router.put("/message/:messageId/", verifyToken, requireSignin, isAdmin, update);
router.get("/message/:messageId", read);
router.get("/message", list);
router.get("/message/", listByUser);

router.param("userId", userById);
router.param("messageId", messageById);

export default router;
