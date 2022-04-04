import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      trim: true,
      required: [true, "Your name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Your email is required"],
      maxlength: 2000,
    },

    content: {
      type: String,
      trim: true,
      required: [true, "Content is required"],
      minLength: [4, "title should be at least four characters"],
    },
  },
  { timestamps: true }
);

var Message = mongoose.model("Message", messageSchema);
export default Message;
