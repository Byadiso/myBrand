import User from "../models/user.js";
import { errorHandler } from "../helper/dbErroHandler.js";

export const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: err,
        errors: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

export const remove = (req, res) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      // deletedCategory,
      message: "User deleted successfully",
    });
  });
};

export const userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    return res.send(req.profile.photo.data);
  }
  next();
};

//fetch all users from theb database
export const listUsers = (req, res) => {
  User.find()
    .select("-photo")
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "Users not found",
        });
      }
      return res.status(200).json({
        users: users,
        message: "all users",
        status: true,
      });
    });
};

export const update = (req, res) => {
  let user = req.profile;
  User.findOneAndUpdate(
    { _id: user._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized  to perfom this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json({user:user, message:'user updated successfully'});
    }
  );
};
