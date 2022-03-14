import Blog from "../models/blog.js";

export const UpdateViews = (req, res) => {
  let blogId = req.params.blogId;

  Blog.updateOne({ _id: blogId }, { $inc: { views: +1 } })

    .populate("Views.viewedBy", "_id name")
    .populate("ViewedBy", "_id name")
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
          message: "Views Updated ",
        });
      }
    });
};
