const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
// const { hash } = require("crypto");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // for read cookie

app.get("/", (req, res) => {
  res.render("index");
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
app.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.send("profile");
});

// register user
app.post("/register", async (req, res) => {
  let { email, password, username, name, age } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("user alredy  registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });
      const token = jwt.sign({ email: email, userid: user._id }, "shhhh");
      res.cookie("token", token);
      res.send("registered");
    });
  });
  // res.render("index");
});

// login proccess
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("somthing went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: email, userid: user._id }, "shhhh");
      res.cookie("token", token);
      res.status(200).send("logged in");
    } else {
      res.redirect("/login");
    }
  });
  // res.render("index");
});

// protected route middleware
function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.send("you must be login");
  else {
    let data = jwt.verify(req.cookies.token, "shhhh");
    req.user = data;
    next();
  }
}

app.listen(3000, () => {
  console.log("server running...");
});
