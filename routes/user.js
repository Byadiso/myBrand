import express from "express";
import {
  userById,
  read,
  update,
  remove,
  listUsers,
  userPhoto,
} from "../controllers/user.js";
import { requireSignin, isAuth, isAdmin } from "../controllers/auth.js";
const router = express.Router();

router.get("/user/:userId", requireSignin, read);
router.put("/user/:userId", requireSignin, update);
router.delete("/user/:userId", requireSignin, isAdmin, remove);

// get all users
router.get("/users/", requireSignin, listUsers);

// photo
router.get("/user/photo/:userId", userPhoto);

router.param("userId", userById);

export default router;
