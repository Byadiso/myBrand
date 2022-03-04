import { errorHandler } from "../helper/dbErroHandler";
import Blog from "../models/blog";

exports.blogById = (req, res, next, id) => {
  Blog
    .findById(id)
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

exports.read = (req, res) => {
  req.blog.photo = undefined;
  return res.json(req.blog);
};

exports.list = (req, res) => {
  
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Blog
    .find()
    .select("-photo")
   
    // .populate('comments','text created')
    .populate("comments.createdBy", "_id name")
    .sort([[sortBy]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "blogs not found",
        });
      }
      res.status(200).json({
        properties: data,
        message: "all Blogs",
        status: true,
      });
    });
};

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  Blog
    .find({ _id: { $ne: req.blog }, category: req.blog.category })
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

exports.listCategories = (req, res) => {
  Blog.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: " categories not found",
      });
    }
    res.json(categories);
  });
};

exports.listByUser = (req, res) => {
  Blog
    .find({ createdBy: req.profile._id })
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

exports.listBySearch = (req, res) => {
 
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Blog
    .find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
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

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !title ||
      !body ||     
      !category ||     
    ) {
      return res.status(400).json({
        error: " All fields are required",
      });
    }

    let blog = new blog(fields);
    blog.createdBy = req.profile;
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

exports.remove = (req, res) => {
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

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    // const {name, description, price, category, quantity, shipping } = fields
    // if(!name || !description || !price || !category || !quantity || !shipping) {
    //     return res.status(400).json({
    //         error: " All fields are required"
    //     })
    // }

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

exports.photo = (req, res, next) => {
  if (req.blog.photo) {
    res.set("Content-Type", req.blog.photo.contentType);
    return res.send(req.blog.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assign category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the blog based on query object with 2 properties
    // search and category
    blog
      .find(query, (err, blogs) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(blogs);
      })
      .select("-photo");
  }
};



exports.comment = (req, res) => {
  let comment = req.body.comment;
  comment.createdBy = req.body.userId;

  Blog
    .findByIdAndUpdate(
      req.body.blogId,
      { $push: { comments: comment } },
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

exports.uncomment = (req, res) => {
  let comment = req.body.comment;

  Blog
    .findByIdAndUpdate(
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

exports.updateComment = (req, res) => {
  let comment = req.body.comment;

  blog
    .findByIdAndUpdate(req.body.blogId, {
      $pull: { comments: { _id: comment._id } },
    })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        blog
          .findByIdAndUpdate(
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
