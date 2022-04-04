"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.remove = exports.read = exports.list = exports.create = exports.categoryById = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dbErroHandler = require("../helper/dbErroHandler.js");

var _category = _interopRequireDefault(require("../models/category.js"));

var create = function create(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Your category name is required"
    });
  }

  var category = new _category["default"](req.body);
  category.save(function (err, data) {
    if (err) {
      return res.status(400).json((0, _defineProperty2["default"])({
        error: (0, _dbErroHandler.errorHandler)(err)
      }, "error", err));
    }

    res.json({
      category: data,
      status: true,
      message: "Your category has been successfull created"
    });
  });
};

exports.create = create;

var categoryById = function categoryById(req, res, next, id) {
  _category["default"].findById(id).exec(function (err, category) {
    if (err || !category) {
      return res.status(400).json({
        error: "category Does not exist"
      });
    }

    req.category = category;
    next();
  });
};

exports.categoryById = categoryById;

var read = function read(req, res) {
  return res.json({
    category: req.category,
    message: "Single category"
  });
};

exports.read = read;

var remove = function remove(req, res) {
  var category = req.category;
  category.remove(function (err, deletedCategory) {
    if (err) {
      return res.status(400).json({
        error: (0, _dbErroHandler.errorHandler)(err),
        status: false
      });
    }

    res.json({
      // deletedCategory,
      message: "Category deleted successfully",
      status: true
    });
  });
};

exports.remove = remove;

var update = function update(req, res) {
  var category = req.category;
  category.name = req.body.name;
  category.save(function (err, result) {
    if (err) {
      return res.status(404).json({
        error: (0, _dbErroHandler.errorHandler)(err)
      });
    }

    res.json(result);
  });
};

exports.update = update;

var list = function list(req, res) {
  _category["default"].find().exec(function (err, categories) {
    if (err) {
      return res.status(400).json({
        error: (0, _dbErroHandler.errorHandler)(err)
      });
    }

    return res.status(200).json({
      count: categories.length,
      categories: categories,
      message: "all your categories"
    });
  });
};

exports.list = list;