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

router.get("/v1/category/:categoryId", read);
router.post("/v1/category/create/", requireSignin, isAdmin, create);
router.delete("/v1/category/:categoryId/", requireSignin, isAdmin, remove);
router.put("/v1/category/:categoryId/", requireSignin, isAdmin, update);
router.get("/v1/categories", list);

router.param("userId", userById);
router.param("categoryId", categoryById);

export default router;
