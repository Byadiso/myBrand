import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      maxlength: [32, "title should less than 32 characters"],
      minLength: [4, "title should be at least four characters"],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },

    content: {
      data: Buffer,
      conentType: String,
    },
  },
  { timestamps: true }
);

var Message = mongoose.model("Message", messageSchema);
export default Message;
