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
          error: " blog not found with that id",
        });
      }
      req.blog = blog;
      next();
    });
};

export const read = (req, res) => {
  req.blog.image = undefined;
  return res.json(req.blog);
};

export const list = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  Blog.find()
    .select("-image")
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
        blogs: data,
        message: "all Blogs",
        status: true,
      });
    });
};

export const listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  Blog.find({ _id: { $ne: req.blog }, category: req.blog.category })
    .select("-image")
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
        blogs: blogs,
        message: `blog by this user`,
      });
    });
};

export const listBySearch = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  Blog.find(findArgs)
    .select("-image")
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
    // console.log("Parsing done.");
    // console.dir(req.headers);
    // console.log(fields);
    // // console.log(files);
    // console.log(files.image);
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { title, content } = fields;

    if (!title && !content) {
      return res.status(400).json({
        error: " All fields are required",
      });
    }

    if (!title) {
      return res.status(400).json({
        error: `Title is required`,
      });
    }
    if (!content) {
      return res.status(400).json({
        error: `Content is required`,
      });
    }

    let blog = new Blog(fields);
    blog.createdBy = req.profile;

    if (files.image) {
      //validation of image files
      if (files.image.size > 3000000) {
        return res.status(400).json({
          error: "Image should be less than  3mb in size",
        });
      }

      blog.image.data = fs.readFileSync(files.image.path);
      blog.image.contentType = files.image.mimetype;
    }
    blog.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          // error: errorHandler(err),
          error: err.message,
          status: false,
        });
      }
      result.image = undefined;
      return res.json({
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

    // check for all fields
    const { title, content } = fields;

    if (!title && !content) {
      return res.status(400).json({
        error: " All fields are required",
      });
    }

    if (!title) {
      return res.status(400).json({
        error: `Title is required`,
      });
    }
    if (!content) {
      return res.status(400).json({
        error: `Content is required`,
      });
    }

    let blog = req.blog;
    blog = _.extend(blog, fields);
    if (files.image) {
      //validation of image files
      if (files.image.size > 3000000) {
        return res.status(400).json({
          error: "Image should be less than  3mb in size",
        });
      }
      blog.image.data = fs.readFileSync(files.image.filepath);
      blog.image.contentType = files.image.mimetype;
    }
    blog.save((err, result) => {
      if (err) {
        return res.status(404).json({
          error: err,
          success: false,
        });
      }
      res.json({
        blog: result,
        success: true,
        message: "Your blog has been Updated successfull",
      });
    });
  });
};

export const photo = (req, res, next) => {
  if (req.blog.image) {
    res.set("Content-Type", req.blog.image.contentType);
    return res.send(req.blog.image.data);
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
    // find the blog based on query object with 2 blogs
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
    }).select("-image");
  }
};

export const comment = (req, res) => {
  let comment = req.body.comment;
  let blogId = req.params.blogId;

  Blog.findByIdAndUpdate(
    blogId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments", "comment created")
    .populate("comments.createdBy", "_id name")
    .populate("createdBy", "_id name")
    .select("-image")
    .exec((err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          errors: err,
          data: result,
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
