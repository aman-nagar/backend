import express from "express";

const app = express();
const port = 4000;

//parsing body (custom middleware)
// app.use((req, res, next) => {
//   // res.send("Global Middleware");
//   console.log(req.headers);
//   console.log(req.url);
//   req.on("data", (chunk) => {
//     const reqBody = JSON.parse(chunk.toString());
//     req.body = reqBody;
//     next();
//   });
// });

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.url);
  console.log(req.route.path);
  res.end("Home Route");
});

app.get("/login", (req, res) => {
  console.log(req.url);
  res.end("Logged In");
});

app.post("/", (req, res) => {
  res.end("Post Home Route");
});
app.post("/user", (req, res) => {
  console.log(req.body);
  res.end("Post User Route");
});

app.put("/", (req, res) => {
  res.end("Put Home Route");
});

app.patch("/", (req, res) => {
  res.end("Patch Home Route");
});

app.delete("/", (req, res) => {
  res.end("Delete Home Route");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
