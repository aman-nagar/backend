// 13_revise/server.js
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const postModel = require("./models/post");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes
app.get("/", (req, res) => {
  res.render("index");
});
// register
app.get("/register", (req, res) => {
  res.render("register");
});

// login
app.get("/login", (req, res) => {
  res.render("login");
});

// logout
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

// profile
app.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");

  res.render("profile", { user });
});

// edit page
app.get("/edit/:id", isLoggedIn, async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

// routes logic  -----------------

// like
app.get("/like/:id", isLoggedIn, async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
});

// update post
app.post("/update/:id", isLoggedIn, async (req, res) => {
  const post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );
  res.redirect("/profile");
});

// create new post
app.post("/post", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  const { content } = req.body;
  const post = await postModel.create({
    user: user._id,
    content,
  });
  user.posts.push(post.id);
  await user.save();
  res.redirect("/profile");
});

// register
app.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) return res.send("alredy registered");
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const newUser = await userModel.create({
        name,
        username,
        email,
        password: hash,
      });
      const token = jwt.sign({ email: email, userid: newUser._id }, "shhh");
      res.cookie("token", token);
      res.send(`Registered `);
    });
  });
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (!existingUser) return res.status(500).send("somthing wentwrong");

  bcrypt.compare(password, existingUser.password, (err, result) => {
    if (result) {
      const token = jwt.sign(
        { email: email, userid: existingUser._id },
        "shhhh"
      );
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });
});

// protected route middleware
function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "shhhh");
    req.user = data;
    next();
  }
}

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("server running...");
});
