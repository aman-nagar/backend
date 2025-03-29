const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("hey");
});

// create
app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "aman",
    email: "amannagar4870@gmail.com",
    userName: "aman",
  });
  res.send(createdUser);
});

// read
app.get("/read", async (req, res) => {
  let users = await userModel.find({ userName: "aman" });
  res.send(users);
});
//update
app.get("/update", async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { userName: "aman" },
    { name: "aman sarita sanjay" },
    { new: true }
  );
  res.send(updatedUser);
});

//delete

app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ userName: "aman" });
  res.send(deletedUser);
});

// port
app.listen(3000, () => {
  console.log("server running...");
});
