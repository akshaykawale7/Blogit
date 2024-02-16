const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
require('dotenv').config()
mongoose.set("strictQuery", true);
mongoose.connect(
 process.env.DATABASE_URL
);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

const homeStartingContent =
  "Welcome to my daily journal blog, where every entry is a journey into self-discovery and personal growth. \n  \n Why write blogs, you ask? Because every word I pen is a step towards understanding myself better, clarifying my thoughts, and documenting my experiences. Here, I believe that the act of writing is a powerful tool for reflection, learning, and expression. \n \n Through my blog, I invite you to embark on a daily adventure of introspection and exploration. Whether it's jotting down fleeting thoughts, recording memorable moments, or delving into deep introspection, each entry adds a layer to the tapestry of my life.";
const aboutContent =
  "Welcome to my corner of the digital universe! I'm Akshay Kawale, a passionate programmer and web developer hailing from DY Patil's RAIT, Mumbai, where I earned my B.E. degree in Information Technology.\n \n With a keen interest in leveraging technology to create meaningful experiences, I've embarked on a journey to explore the endless possibilities of the digital realm. Armed with a solid foundation in IT and a thirst for knowledge, I'm constantly honing my skills to stay at the forefront of innovation.\n \n My mission? To craft elegant solutions to complex problems and bring ideas to life through code. Whether it's building intuitive user interfaces, optimizing backend systems for peak performance, or diving into the latest web technologies, I thrive on the challenges of the ever-evolving tech landscape. \n \n Join me as I navigate the exciting world of software development, one line of code at a time. Together, let's push the boundaries of what's possible and create experiences that inspire and delight.";
const contactContent =
  "Feel free to reach out to me through the following channels: \n \n 📧 Email: akshay.kawale700@gmail.com | 🔗 LinkedIn: www.linkedin.com/in/akshaykawale7";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find().then((posts) => {
    if (posts) {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts,
      });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { startingContent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { startingContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.post,
  });

  post.save();

  res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {
  const postId = req.params.postId;
  Post.findOne({ _id: postId }).then((foundPost) => {
    if (foundPost) {
      res.render("post", {
        postTitle: foundPost.title,
        postContent: foundPost.content,
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running successfully");
});
