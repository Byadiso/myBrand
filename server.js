import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import path from "path";

//import routes

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import blogRoutes from "./routes/blog";

//app
const app = express();

//for cross origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//db
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://byadiso:Uwineza3010@cluster0.kbaby.mongodb.net/kodesha?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.error(`Error connecting to  the database . \n${err}`);
  });

//middlewares
app.use(bodyParser.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", blogRoutes);

app.use("*", (req, res) => {
  res.status(400).json({
    status: 400,
    message: "Sorry this router doesn't exist !",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports.app = app;
