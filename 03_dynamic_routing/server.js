const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/profile/:username", (req, res) => {
  const username = req.params.username;
  res.send(username);
  res.render("profile");
});
app.get("/author/:username/:age", (req, res) => {
  const username = req.params.username;
  const age = req.params.age;
  res.send(`Welcome: ${username} your age is : ${age} `);
});

app.listen(3000, () => {
  console.log("server running");
});
