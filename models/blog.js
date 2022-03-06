import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
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
        text: String,
        created: { type: Date, default: Date.now },
        createdBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

var Blog = mongoose.model("Blog", blogSchema);
export default Blog;
