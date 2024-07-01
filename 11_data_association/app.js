// app.js
const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("/");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    username: "jack",
    age: 55,
    email: "jack@gmail.com",
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  const post = await postModel.create({
    postdata: "hello",
    user: "66830ad4a9c00e2e60a5492b",
  });
  const user = await userModel.findOne({ _id: "66830ad4a9c00e2e60a5492b" });
  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen(3000, () => {
  console.log("server running...");
});
