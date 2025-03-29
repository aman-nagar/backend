const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("middleware");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/profile", (req, res, next) => {
  // res.send("profile");
  return next(new Error("Somthing went wrong"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("somthing broke");
});
app.listen(3000);
