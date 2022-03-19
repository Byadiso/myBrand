import express from "express";
const router = express.Router();

import { signup, signin, signout, requireSignin } from "../controllers/auth.js";
import { userLoginValidator, userSignupValidator } from "../validator/index.js";

router.post("/signup", userSignupValidator, signup);
router.post("/login", userLoginValidator, signin);
router.get("/signout", signout);

export default router;
