"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongooseErrorHandler = mongooseErrorHandler;

function mongooseErrorHandler(err, req, res, next) {
  if (err.errors) {
    var error = {};
    var keys = Object.keys(err.errors);
    keys.forEach(function (key) {
      var message = err.errors[key].message;

      if (err.errors[key].properties && err.errors[key].properties.message) {
        message = err.errors[key].properties.message.replace("`{PATH}`", key);
      }

      message = message.replace("Path ", "").replace(key, "").trim();
      error[key] = message;
    });
    return res.status(500).json(error); // or return next(error);
  }

  next();
}