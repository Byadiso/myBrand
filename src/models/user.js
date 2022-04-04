import mongoose from "mongoose";
import { v1 as uuidv1 } from "uuid";
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: { type: String, trim: true, required: true, unique: true },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

var user = mongoose.model("User", userSchema);

// module.exports
export default user;
