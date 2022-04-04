// import Blog from "../models/blog.js";

// // export const UpdateViews = (req, res, next) => {
// //   let blogId = req.params.blogId;

// //   Blog.updateOne({ _id: blogId }, { $inc: { views: +1 } })
// //     .select("-image")
// //     .populate("Views.viewedBy", "_id name")
// //     .populate("ViewedBy", "_id name")
// //     .exec((err, result) => {
// //       if (err) {
// //         console.log(err);
// //         return res.status(404).json({
// //           errors: err,
// //           data: result,
// //         });
// //       } else {
// //         return res.status(200).json({
// //           data: result,
// //           status: true,
// //           message: "Views Updated ",
// //         });
// //       }
// //     });

// //   next();
// // };
