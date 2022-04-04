// import { check, validationResult } from "express-validator";

export const userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({ min: 4, max: 32 });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 3 })
    .withMessage("Password must contain at least 3 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

export const userLoginValidator = (req, res, next) => {
  req.check("email", "email is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({ min: 4, max: 32 });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 3 })
    .withMessage("Password must contain at least 3 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

export const createBlogValidator = (req, res, next) => {
  // req.check("title", "Title is required").notEmpty();
  req
    .check("content", "body must be between 3 to 50 characters")
    .isLength({ min: 4, max: 32 }).json;
  req.check("image", "image is required").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
