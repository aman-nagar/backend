// 14_ClassyCarry/app.js
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("hey");
});

app.listen(3000, () => {
  console.log("server running...");
});
