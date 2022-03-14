import { errorHandler } from "../helper/dbErroHandler.js";
import formidable from "formidable";
import _ from "lodash";
import fs from "fs";
import Message from "../models/message.js";

export const messageById = (req, res, next, id) => {
  Blog.findById(id)
    .populate("message.createdBy", "_id name")
    .exec((err, message) => {
      if (err || !message) {
        return res.status(400).json({
          error: " message not found",
        });
      }
      req.message = message;
      next();
    });
};

export const read = (req, res) => {
  return res.json(req.message);
};

export const list = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Message.find()
    // .populate('comments','text created')
    .populate("message.createdBy", "_id name")
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "messages not found",
        });
      }
      res.status(200).json({
        count: data.length + " messages",
        messages: data,
        message: "all messages",
        status: true,
      });
    });
};

export const listByUser = (req, res) => {
  Message.find({ createdBy: req.profile._id })
    .populate("createdBy", "_id name")
    .select("_id title body created comments")
    .sort("_created")
    .exec((err, messages) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        messages: messages,
        message: `message by this user`,
      });
    });
};

export const create = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    // console.log("Parsing done.");
    // console.dir(req.headers);
    // console.log(fields);
    // // console.log(files);
    // console.log(files.image);

    // check for all fields
    const { Sender, email, content } = fields;

    if ((!sender && !email, content)) {
      return res.status(400).json({
        error: " All fields are required",
      });
    }

    if (!sender) {
      return res.status(400).json({
        error: `Your is required`,
      });
    }
    if (!content) {
      return res.status(400).json({
        error: `Content is required`,
      });
    }

    let message = new Blog(fields);
    message.createdBy = req.profile;

    message.save((err, result) => {
      result.image = undefined;
      if (err) {
        console.log(err);
        return res.status(404).json({
          // error: errorHandler(err),
          error: err.message,
          status: false,
        });
      }
      res.json({
        message: result,
        status: true,
        message: "Your message has ben sent successful",
      });
    });
  });
};

export const remove = (req, res) => {
  let message = req.message;
  message.remove((err, deletedblog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      // deletedblog,
      message: "message deleted successfully",
      status: true,
    });
  });
};

export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields) => {
    let message = req.message;
    message = _.extend(message, fields);

    message.save((err, result) => {
      if (err) {
        return res.status(404).json({
          error: err,
          success: false,
        });
      }
      res.json({
        message: result,
        success: true,
        message: "Your message has been Updated successfull",
      });
    });
  });
};
