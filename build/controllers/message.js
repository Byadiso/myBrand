"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.remove = exports.read = exports.messageById = exports.listByUser = exports.list = exports.create = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dbErroHandler = require("../helper/dbErroHandler.js");

var _formidable = _interopRequireDefault(require("formidable"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _message = _interopRequireDefault(require("../models/message.js"));

var messageById = function messageById(req, res, next, id) {
  _message["default"].findById(id).exec(function (err, message) {
    if (err || !message) {
      return res.status(400).json({
        errorMessage: " message not found",
        error: err
      });
    }

    req.message = message;
    next();
  });
};

exports.messageById = messageById;

var read = function read(req, res) {
  return res.json(req.message);
};

exports.read = read;

var list = function list(req, res) {
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;

  _message["default"].find().limit(limit).exec(function (err, data) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "messages not found"
      });
    }

    res.status(200).json({
      count: data.length + " messages",
      messages: data,
      message: "all messages",
      status: true
    });
  });
};

exports.list = list;

var listByUser = function listByUser(req, res) {
  _message["default"].find({
    createdBy: req.profile._id
  }).populate("createdBy", "_id name").select("_id title body created comments").sort("_created").exec(function (err, messages) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({
      messages: messages,
      message: "message by this user"
    });
  });
};

exports.listByUser = listByUser;

var create = function create(req, res) {
  // check for all fields
  var sender = req.body.sender;
  var email = req.body.email;
  var content = req.body.content;

  if (!sender && !email && content) {
    return res.status(400).json({
      error: " All fields are required"
    });
  } // if (!sender) {
  //   console.log(req);
  //   return res.status(400).json({
  //     error: `Your name is required.`,
  //   });
  // }
  // if (!content) {
  //   return res.status(400).json({
  //     error: `Your content is required.`,
  //   });
  // }
  // if (!email) {
  //   return res.status(400).json({
  //     error: `Your email is required.`,
  //   });
  // }


  var message = new _message["default"](req.body);
  message.createdBy = req.body.sender;
  message.save(function (err, result) {
    if (err) {
      console.log(err);
      return res.status(404).json({
        // error: errorHandler(err),
        error: err.message,
        status: false
      });
    }

    res.json((0, _defineProperty2["default"])({
      message: result,
      status: true
    }, "message", "Your message has been sent successful"));
  });
};

exports.create = create;

var remove = function remove(req, res) {
  var message = req.message;
  message.remove(function (err, deletedMessage) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({
      // deletedMessage,
      message: "message deleted successfully",
      status: true
    });
  });
};

exports.remove = remove;

var update = function update(req, res) {
  var form = new _formidable["default"].IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function (err, fields) {
    var message = req.message;
    message = _lodash["default"].extend(message, fields);
    message.save(function (err, result) {
      if (err) {
        return res.status(404).json({
          error: err,
          success: false
        });
      }

      res.json((0, _defineProperty2["default"])({
        message: result,
        success: true
      }, "message", "Your message has been Updated successfull"));
    });
  });
};

exports.update = update;