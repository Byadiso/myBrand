import express from "express";
const router = express.Router();

import { requireSignin, isAuth, isAdmin } from "../controllers/auth.js";
import {
  // create,
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

// router.post("/v1/message/create/", create);
router.delete(
  "/v1/message/:messageId/",
  verifyToken,
  requireSignin,
  isAdmin,
  remove
);
router.put("/v1/message/:messageId/", isAdmin, update);
router.get("/v1/message/:messageId", read);
router.get("/v1/messages", list);
router.get("/v1/message/", listByUser);

router.param("userId", userById);
router.param("messageId", messageById);

export default router;
