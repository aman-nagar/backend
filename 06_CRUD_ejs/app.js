//backend_mern/06_CRUD_ejs/app.js
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

// create
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;

  let createUser = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});

// read
app.get("/read", async (req, res) => {
  const users = await userModel.find();
  res.render("read", { users });
});

// edit
app.get("/edit/:userid", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

// update
app.post("/update/:userid", async (req, res) => {
  const { name, email, image } = req.body;
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { name, email, image },
    { new: true }
  );
  res.redirect("/read");
});

// delete
app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.listen(3000, () => {
  console.log("server running...");
});
