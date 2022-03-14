import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import expressJwt from "express-jwt"; // for authorization check

export const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  console.log(req.headers);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  token = token.split(" ");

  try {
    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
