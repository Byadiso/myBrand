import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressValidator from "express-validator";
import cors from "cors";

import path from "path";

dotenv.config();

//import routes

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";
import categoryRoutes from "./routes/category.js";
import messageRoutes from "./routes/message.js";

//app
const app = express();

//for cross origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//db
mongoose
  .connect(process.env.MONGODB_URI)
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

//middlewares
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());

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
app.use("/api", messageRoutes);
app.use("/api", categoryRoutes);

app.use("*", (req, res) => {
  res.status(400).json({
    status: 400,
    error: "Sorry this router doesn't exist !",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("views/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "build", "home"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

export default app;
