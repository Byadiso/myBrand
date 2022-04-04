"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

_mongoose["default"].set("useCreateIndex", true);

_mongoose["default"].set("useFindAndModify", false);

_mongoose["default"].connect(process.env.MONGODB_URI || "mongodb+srv://byadiso:Uwineza3010@cluster0.sekj1.mongodb.net/mybrand?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
}); //db
// mongoose
//   .connect(
//     process.env.MONGODB_URI ||
//       "mongodb+srv://byadiso:Uwineza3010@cluster0.kbaby.mongodb.net/kodesha?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("DB Connected"))
//   .catch((err) => {
//     console.error(`Error connecting to  the database . \n${err}`);
//   });

var _default = db;
exports["default"] = _default;