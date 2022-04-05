import express from "express";
import {
  userById,
  read,
  update,
  remove,
  listUsers,
  userPhoto,
} from "../controllers/user.js";
import { requireSignin, isAuth, isAdmin } from "../controllers/auth.js.js";
const router = express.Router();

router.get("/v1/user/:userId", requireSignin, read);
router.put("/v1/user/:userId", requireSignin, update);
router.delete("/v1/user/:userId", requireSignin, isAdmin, remove);

// get all users
router.get("/v1/users/", requireSignin, listUsers);

// photo
router.get("v1/user/photo/:userId", userPhoto);

router.param("userId", userById);

export default router;
