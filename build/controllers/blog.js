"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateComment = exports.update = exports.uncomment = exports.remove = exports.read = exports.photo = exports.listSingleBlog = exports.listSearch = exports.listRelated = exports.listCategories = exports.listByUser = exports.listBySearch = exports.list = exports.create = exports.comment = exports.blogById = void 0;

var _dbErroHandler = require("../helper/dbErroHandler.js");

var _formidable = _interopRequireDefault(require("formidable"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _blog = _interopRequireDefault(require("../models/blog.js"));

var blogById = function blogById(req, res, next, id) {
  _blog["default"].findById(id).populate("comments", "text created").populate("comments.createdBy", "_id name").exec(function (err, blog) {
    if (err || !blog) {
      return res.status(400).json({
        error: " blog not found with that id"
      });
    } // if (req.blog) {
    //   console.log(req.blog);
    //   req.blog = blog;
    //   return res.send(req.blog);
    // }


    req.blog = blog; //   return res.send(req.blog);
    // res.status(200).json({ Blog: blog, message: "single blog" });

    next();
  });
};

exports.blogById = blogById;

var read = function read(req, res) {
  req.blog.image = undefined;

  if (res.status == 500) {
    return res.status(500).json({
      error: "internal error"
    });
  }

  return res.status(200).json({
    Blog: req.blog,
    message: "succceeded yes"
  });
};

exports.read = read;

var list = function list(req, res) {
  var limit = req.query.limit ? parseInt(req.query.limit) : 50;

  _blog["default"].find().select("-image") // .populate('comments','text created')
  .populate("comments.createdBy", "_id name").limit(limit).exec(function (err, data) {
    if (err) {
      return res.status(400).json({
        error: "blogs not found"
      });
    }

    return res.status(200).json({
      count: data.length + " Blogs",
      blogs: data,
      message: "all Blogs",
      status: true
    });
  });
};

exports.list = list;

var listRelated = function listRelated(req, res) {
  var limit = req.query.limit ? parseInt(req.query.limit) : 4;

  _blog["default"].find({
    _id: {
      $ne: req.blog
    },
    category: req.blog.category
  }).select("-image").limit(limit).populate("category", "_id name").exec(function (err, blogs) {
    if (err) {
      return res.status(400).json({
        error: "blogs not found"
      });
    }

    res.json(blogs);
  });
};

exports.listRelated = listRelated;

var listCategories = function listCategories(req, res) {
  _blog["default"].distinct("category", {}, function (err, categories) {
    if (err) {
      return res.status(400).json({
        error: " categories not found"
      });
    }

    res.json(categories);
  });
};

exports.listCategories = listCategories;

var listByUser = function listByUser(req, res) {
  _blog["default"].find({
    createdBy: req.profile._id
  }).populate("createdBy", "_id name").select("_id title body created comments").sort("_created").exec(function (err, blogs) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({
      blogs: blogs,
      message: "blog by this user"
    });
  });
};

exports.listByUser = listByUser;

var listSingleBlog = function listSingleBlog(req, res) {
  _blog["default"].find({
    _id: req.param.blogById
  }).populate("createdBy", "_id name").select("_id title body created comments").sort("_created").exec(function (err, blog) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json({
      blogs: blog,
      message: "Single blog"
    });
  });
};

exports.listSingleBlog = listSingleBlog;

var listBySearch = function listBySearch(req, res) {
  var limit = req.body.limit ? parseInt(req.body.limit) : 100;
  var skip = parseInt(req.body.skip);
  var findArgs = {};

  _blog["default"].find(findArgs).select("-image").populate("category").skip(skip).limit(limit).exec(function (err, data) {
    if (err) {
      return res.status(400).json({
        error: "blogs not found"
      });
    }

    res.json({
      size: data.length,
      data: data
    });
  });
};

exports.listBySearch = listBySearch;

var create = function create(req, res) {
  var form = new _formidable["default"].IncomingForm(); // console.log(req.body);
  // if (req.body) {
  //   let blog = new Blog(req.body);
  //   blog.createdBy = req.profile;
  //   blog.save((err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(404).json({
  //         // error: errorHandler(err),
  //         error: err.message,
  //         status: false,
  //       });
  //     }
  //     result.image = "images/blog.jpg";
  //     return res.json({
  //       blog: result,
  //       status: true,
  //       message:
  //         "Your blog is created successful by req.body instead of a form with an image",
  //     });
  //   });
  // }
  //

  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    // console.log("Parsing done.");
    // console.dir(req.headers);
    // // console.log(files);
    // console.log(files.image);
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    } // check for all fields


    var title = fields.title,
        content = fields.content;

    if (!title && !content) {
      return res.status(400).json({
        error: " All fields are required"
      });
    }

    if (!title) {
      return res.status(400).json({
        error: "Title is required"
      });
    }

    if (!content) {
      return res.status(400).json({
        error: "Content is required"
      });
    }

    var blog = new _blog["default"](fields);
    blog.createdBy = req.profile;

    if (files.image) {
      //validation of image files
      if (files.image.size > 3000000) {
        return res.status(400).json({
          error: "Image should be less than  3mb in size"
        });
      } // console.log(files.image);
      // var oldPath = files.image.path;
      // var newPath = path.join(__dirname, "uploads") + "/" + files.image.name;
      // var rawData = fs.readFileSync(oldPath);
      // fs.writeFile(newPath, rawData, function (err) {
      //   if (err) console.log(err);
      //   return res.send("Successfully uploaded to my computer");
      // });


      blog.image.data = _fs["default"].readFileSync(files.image.path);
      blog.image.contentType = files.image.type;
    }

    blog.save(function (err, result) {
      if (err) {
        // console.log(err);
        return res.status(404).json({
          // error: errorHandler(err),
          error: err.message,
          status: false
        });
      }

      result.image = undefined;
      return res.json({
        blog: result,
        status: true,
        message: "Your blog is created successful"
      });
    }); // if (form.error == null) {
    //   console.log("NO we have something in th field");
    // }
  }); // uncomment this or the top one for test to pass for blog
  // if (form.error == null && req.body && req.body.files == undefined) {
  //   let blog = new Blog({
  //     title: req.body.title,
  //     content: req.body.content,
  //     image: req.body.image,
  //   });
  //   blog.createdBy = req.profile;
  //   blog.save((err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(404).json({
  //         // error: errorHandler(err),
  //         error: err.message,
  //         status: false,
  //       });
  //     }
  //     result.image = "images/blog.jpg";
  //     return res.json({
  //       blog: result,
  //       status: true,
  //       message:
  //         "Your blog is created successful by req.body instead of a form with an image",
  //     });
  //   });
  // }
};

exports.create = create;

var remove = function remove(req, res) {
  var blog = req.blog;
  blog.remove(function (err, deletedblog) {
    if (err) {
      return res.status(400).json({
        error: (0, _dbErroHandler.errorHandler)(err)
      });
    }

    res.json({
      // deletedblog,
      message: "blog deleted successfully",
      status: true
    });
  });
};

exports.remove = remove;

var update = function update(req, res) {
  var form = new _formidable["default"].IncomingForm();
  form.keepExtensions = true; //check if i used form to update my data

  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    } // check for all fields


    var title = fields.title,
        content = fields.content;

    if (!title && !content) {
      return res.status(400).json({
        error: " All fields are required"
      });
    }

    if (!title) {
      return res.status(400).json({
        error: "Title is required"
      });
    }

    if (!content) {
      return res.status(400).json({
        error: "Content is required"
      });
    }

    var blog = req.blog;
    blog = _lodash["default"].extend(blog, fields);

    if (files.image) {
      //validation of image files
      if (files.image.size > 3000000) {
        return res.status(400).json({
          error: "Image should be less than  3mb in size"
        });
      }

      blog.image.data = _fs["default"].readFileSync(files.image.filepath);
      blog.image.contentType = files.image.type;
    }

    blog.save(function (err, result) {
      if (err) {
        return res.status(404).json({
          error: err,
          success: false
        });
      }

      res.json({
        blog: result,
        success: true,
        message: "Your blog has been Updated successfull"
      });
    });
  });
};

exports.update = update;

var photo = function photo(req, res, next) {
  if (req.blog.image) {
    res.set("Content-Type", req.blog.image.contentType);
    return res.send(req.blog.image.data);
  }

  next();
};

exports.photo = photo;

var listSearch = function listSearch(req, res) {
  // create query object to hold search value and category value
  var query = {}; // assign search value to query.name

  if (req.query.search) {
    query.title = {
      $regex: req.query.search,
      $options: "i"
    }; // assign category value to query.category

    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    } // find the blog based on query object with 2 blogs
    // search and category


    _blog["default"].find(query, function (err, blogs) {
      if (err) {
        return res.status(400).json({
          error: (0, _dbErroHandler.errorHandler)(err)
        });
      }

      res.status(200).json({
        success: true,
        message: "".concat(blogs.length > 0 ? "Found " + blogs.length + " blog(s)" : "Nothing found"),
        blogs: blogs
      });
    }).select("-image");
  }
};

exports.listSearch = listSearch;

var comment = function comment(req, res) {
  var comment = req.body.comment;
  var blogId = req.params.blogId;

  _blog["default"].findByIdAndUpdate(blogId, {
    $push: {
      comments: comment
    }
  }, {
    "new": true
  }).populate("comments", "comment created").populate("comments.createdBy", "_id name").populate("createdBy", "_id name").select("-image").exec(function (err, result) {
    if (err) {
      console.log(err);
      return res.status(404).json({
        errors: err,
        data: result
      });
    } else {
      res.json({
        data: result,
        status: true,
        message: "Your comment has been added "
      });
    }
  });
};

exports.comment = comment;

var uncomment = function uncomment(req, res) {
  var comment = req.body.comment;

  _blog["default"].findByIdAndUpdate(req.body.blogId, {
    $pull: {
      comments: {
        _id: comment._id
      }
    }
  }, {
    "new": true
  }).populate("comments.postedBy", "_id name").populate("postedBy", "_id name").exec(function (err, result) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    } else {
      res.json({
        data: result,
        status: true,
        message: "Your comment has been removed "
      });
    }
  });
};

exports.uncomment = uncomment;

var updateComment = function updateComment(req, res) {
  var comment = req.body.comment;

  _blog["default"].findByIdAndUpdate(req.body.blogId, {
    $pull: {
      comments: {
        _id: comment._id
      }
    }
  }).exec(function (err, result) {
    if (err) {
      return res.status(400).json({
        error: err
      });
    } else {
      _blog["default"].findByIdAndUpdate(req.body.blogId, {
        $push: {
          comments: comment,
          updated: new Date()
        }
      }, {
        "new": true
      }).populate("comments.postedBy", "_id name").populate("postedBy", "_id name").exec(function (err, result) {
        if (err) {
          return res.status(400).json({
            error: err
          });
        } else {
          res.json(result);
        }
      });
    }
  });
};

exports.updateComment = updateComment;