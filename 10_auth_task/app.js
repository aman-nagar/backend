const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// getting data from browser's body
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// home
app.get("/", (req, res) => {
  res.render("index");
});

// register user
app.post("/register", (req, res) => {
  const { username, email, password } = req.body; // getting req
  bcrypt.genSalt(10, (err, salt) => {
    // password encryption hashing
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await userModel.create({
        username,
        email,
        password: hash,
      });
      const token = jwt.sign({ email }, "shhh");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});

// login
app.get("/login", (req, res) => {
  res.render("login");
});

// register
app.get("/register", (req, res) => {
  res.render("register");
});

// login validation
app.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("somthing went wrong");
  console.log(user.password, req.body.password);

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: user.email }, "shhh");
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.send("somthing went wrong");
    }
  });
});

// profile
app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, "shhh", async (err, decoded) => {
    if (err) return res.redirect("/login");

    try {
      const user = await userModel.findOne({ email: decoded.email });
      if (!user) return res.redirect("/login");

      res.render("profile", { user });
    } catch (error) {
      res.status(500).send("Error fetching profile");
      console.error(error);
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("server running...");
});
