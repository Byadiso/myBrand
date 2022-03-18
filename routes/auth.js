import express from "express";
const router = express.Router();

import { signup, signin, signout, requireSignin } from "../controllers/auth.js";
import { userSignupValidator } from "../validator/index.js";

router.post("/signup", signup);
router.post("/login", signin);
router.get("/signout", signout);

export default router;
