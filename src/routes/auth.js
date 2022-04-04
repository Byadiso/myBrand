import express from "express";
const router = express.Router();

import { signup, signin, signout, requireSignin } from "../controllers/auth.js";
import { userLoginValidator, userSignupValidator } from "../validator/index.js";

router.post("/v1/signup", userSignupValidator, signup);
router.post("/v1/login", userLoginValidator, signin);
router.get("/v1/signout", signout);

export default router;
