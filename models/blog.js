import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      maxlength: [32, "title should less than 32 characters"],
      minLength: [4, "title should be at least four characters"],
    },
    content: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },

    image: {
      data: Buffer,
      conentType: String,
    },

    createdBy: {
      type: ObjectId,
      ref: "User",
    },

    comments: [
      {
        type: String,
        created: { type: Date, default: Date.now },
        createdBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

var Blog = mongoose.model("Blog", blogSchema);
export default Blog;
