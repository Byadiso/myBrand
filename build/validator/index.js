"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSignupValidator = exports.userLoginValidator = exports.createBlogValidator = void 0;

// import { check, validationResult } from "express-validator";
var userSignupValidator = function userSignupValidator(req, res, next) {
  req.check("name", "Name is required").notEmpty();
  req.check("email", "Email must be between 3 to 32 characters").matches(/.+\@.+\..+/).withMessage("Email must contain @").isLength({
    min: 4,
    max: 32
  });
  req.check("password", "Password is required").notEmpty();
  req.check("password").isLength({
    min: 3
  }).withMessage("Password must contain at least 3 characters").matches(/\d/).withMessage("Password must contain a number");
  var errors = req.validationErrors();

  if (errors) {
    var firstError = errors.map(function (error) {
      return error.msg;
    })[0];
    return res.status(400).json({
      error: firstError
    });
  }

  next();
};

exports.userSignupValidator = userSignupValidator;

var userLoginValidator = function userLoginValidator(req, res, next) {
  req.check("email", "email is required").notEmpty();
  req.check("email", "Email must be between 3 to 32 characters").matches(/.+\@.+\..+/).withMessage("Email must contain @").isLength({
    min: 4,
    max: 32
  });
  req.check("password", "Password is required").notEmpty();
  req.check("password").isLength({
    min: 3
  }).withMessage("Password must contain at least 3 characters").matches(/\d/).withMessage("Password must contain a number");
  var errors = req.validationErrors();

  if (errors) {
    var firstError = errors.map(function (error) {
      return error.msg;
    })[0];
    return res.status(400).json({
      error: firstError
    });
  }

  next();
};

exports.userLoginValidator = userLoginValidator;

var createBlogValidator = function createBlogValidator(req, res, next) {
  // req.check("title", "Title is required").notEmpty();
  req.check("content", "body must be between 3 to 50 characters").isLength({
    min: 4,
    max: 32
  }).json;
  req.check("image", "image is required").notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    var firstError = errors.map(function (error) {
      return error.msg;
    })[0];
    return res.status(400).json({
      error: firstError
    });
  }

  next();
};

exports.createBlogValidator = createBlogValidator;