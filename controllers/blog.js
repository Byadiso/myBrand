import { errorHandler } from "../helper/dbErroHandler.js";
import formidable from "formidable";
import _ from "lodash";
import fs from "fs";
import Blog from "../models/blog.js";

export const blogById = (req, res, next, id) => {
  Blog.findById(id)
    .populate("comments", "text created")
    .populate("comments.createdBy", "_id name")
    .exec((err, blog) => {
      if (err || !blog) {
        return res.status(400).json({
          error: " blog not found",
        });
      }
      req.blog = blog;
      next();
    });
};

export const read = (req, res) => {
  req.blog.photo = undefined;
  return res.json(req.blog);
};

export const list = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Blog.find()
    .select("-photo")
    // .populate('comments','text created')
    .populate("comments.createdBy", "_id name")
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "blogs not found",
        });
      }
      res.status(200).json({
        count: data.length + " Blogs",
        properties: data,
        message: "all Blogs",
        status: true,
      });
    });
};

export const listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  Blog.find({ _id: { $ne: req.blog }, category: req.blog.category })
    .select("-photo")
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: "blogs not found",
        });
      }
      res.json(blogs);
    });
};

export const listCategories = (req, res) => {
  Blog.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: " categories not found",
      });
    }
    res.json(categories);
  });
};

export const listByUser = (req, res) => {
  Blog.find({ createdBy: req.profile._id })
    .populate("createdBy", "_id name")
    .select("_id title body created comments")
    .sort("_created")
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        properties: blogs,
        message: `blog by this user`,
      });
    });
};

export const listBySearch = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  Blog.find(findArgs)
    .select("-photo")
    .populate("category")
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "blogs not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { title, content } = fields;
    console.log(fields);
    if (!title || !content) {
      return res.status(400).json({
        error: " All fields are required",
      });
    }

    let blog = new Blog(fields);
    blog.createdBy = req.profile;
    console.log(files.photo);
    if (files.photo) {
      //validation of photo files
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "Image should be less than  3mb in size",
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }
    blog.save((err, result) => {
      if (err) {
        return res.status(404).json({
          error: errorHandler(err),
          // error: err,
          status: false,
        });
      }
      res.json({
        blog: result,
        status: true,
        message: "Your blog is created successful",
      });
    });
  });
};

export const remove = (req, res) => {
  let blog = req.blog;
  blog.remove((err, deletedblog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      // deletedblog,
      message: "blog deleted successfully",
      status: true,
    });
  });
};

export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let blog = req.blog;
    blog = _.extend(blog, fields);
    if (files.photo) {
      //validation of photo files
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "Image should be less than  3mb in size",
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }
    blog.save((err, result) => {
      if (err) {
        return res.status(404).json({
          error: errorHandler(err),
          status: false,
        });
      }
      res.json({
        property: result,
        status: true,
        message: "Your property has been Updated successfull",
      });
    });
  });
};

export const photo = (req, res, next) => {
  if (req.blog.photo) {
    res.set("Content-Type", req.blog.photo.contentType);
    return res.send(req.blog.photo.data);
  }
  next();
};

export const listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
    // assign category value to query.category

    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the blog based on query object with 2 properties
    // search and category
    Blog.find(query, (err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(200).json({
        success: true,
        message: `${
          blogs.length > 0
            ? "Found " + blogs.length + " blog(s)"
            : "Nothing found"
        }`,
        blogs: blogs,
      });
    }).select("-photo");
  }
};

export const comment = (req, res) => {
  comment.text = req.body.comment;
  console.log(req.params.userId);

  comment.createdBy = req.params.userId;

  Blog.findByIdAndUpdate(
    req.params.blogId,
    { $push: { comments: comment.text } },
    { new: true }
  )
    .populate("comments", "text created")
    .populate("comments.createdBy", "_id name")
    .populate("createdBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json({
          data: result,
          status: true,
          message: "Your comment has been added ",
        });
      }
    });
};

export const uncomment = (req, res) => {
  let comment = req.body.comment;

  Blog.findByIdAndUpdate(
    req.body.blogId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json({
          data: result,
          status: true,
          message: "Your comment has been removed ",
        });
      }
    });
};

export const updateComment = (req, res) => {
  let comment = req.body.comment;

  Blog.findByIdAndUpdate(req.body.blogId, {
    $pull: { comments: { _id: comment._id } },
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      Blog.findByIdAndUpdate(
        req.body.blogId,
        { $push: { comments: comment, updated: new Date() } },
        { new: true }
      )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          } else {
            res.json(result);
          }
        });
    }
  });
};
