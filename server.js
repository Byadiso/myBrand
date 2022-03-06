import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import path from "path";

dotenv.config();

//import routes

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";

//app
const app = express();

//db
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://byadiso:Uwineza3010!@cluster0.sekj1.mongodb.net/mybrand?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.error(`Error connecting to  the database . \n${err}`);
  });

// set header

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//for cross origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
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
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", blogRoutes);

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

export default app;
