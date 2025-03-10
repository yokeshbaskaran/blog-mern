//dot-env for Envirnment variables
require("dotenv").config();
//Express App Starts
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//Model-schema
// const User = require("./models/User");
// const Post = require("./models/Post");

var cookieParser = require("cookie-parser");
//routes
const blogRoutes = require("./router/blogRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://blog-posts-mern.onrender.com"],
  })
);

// --------------------Deployment---------------

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

//--------------------Deployment---------------

mongoose.connect(process.env.MONGO_DB).then(() => {
  console.log("DB connected!");
});

app.use("/", blogRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
