import express from "express";

import { requireSignin, isAuth, isAdmin } from "../controllers/auth.js";
import {
  create,
  categoryById,
  remove,
  read,
  update,
  list,
} from "../controllers/category.js";
import { userById } from "../controllers/user.js";

const router = express.Router();

//for categories routers

router.get("/category/:categoryId", read);
router.post("/category/create/", requireSignin, isAdmin, create);
router.delete("/category/:categoryId/", requireSignin, isAdmin, remove);
router.put("/category/:categoryId/", requireSignin, isAdmin, update);
router.get("/categories", list);

router.param("userId", userById);
router.param("categoryId", categoryById);

export default router;
