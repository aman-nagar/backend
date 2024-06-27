const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    console.log(files);
    res.render("index", { files: files });
  });
});
app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    console.log(filedata);
    res.render("show", {
      fileName: req.params.filename,
      fileData: filedata,
    });
  });
});
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});
app.post("/edit", (req, res) => {
  console.log(req.body);
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err) => {
    console.log(err);
    res.redirect("/");
  });
});

app.post("/create", (req, res) => {
  //   console.log(req.body);
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      console.log(err);
    }
  );
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("server running...");
});
