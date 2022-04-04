"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _blog = _interopRequireDefault(require("./routes/blog.js"));

var _category = _interopRequireDefault(require("./routes/category.js"));

var _message = _interopRequireDefault(require("./routes/message.js"));

_dotenv["default"].config(); //import routes


//app
var app = (0, _express["default"])(); //for cross origin

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
}); //db

_mongoose["default"].connect(process.env.MONGODB_URI).then(function () {
  return console.log("DB Connected");
})["catch"](function (err) {
  console.error("Error connecting to  the database . \n".concat(err));
}); // set header


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
}); //middlewares

app.use(_bodyParser["default"].json());
app.use((0, _expressValidator["default"])());
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json()); //routes middleware

app.use("/api", _auth["default"]);
app.use("/api", _user["default"]);
app.use("/api", _blog["default"]);
app.use("/api", _message["default"]);
app.use("/api", _category["default"]);
app.use("*", function (req, res) {
  res.status(400).json({
    status: 400,
    error: "Sorry this router doesn't exist !"
  });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});

if (process.env.NODE_ENV === "production") {
  app.use(_express["default"]["static"]("views/build"));
  app.get("*", function (req, res) {
    res.sendFile(_path["default"].resolve(__dirname, "views", "build", "home"));
  });
} else {
  app.get("/", function (req, res) {
    res.send("Api running");
  });
}

var _default = app;
exports["default"] = _default;