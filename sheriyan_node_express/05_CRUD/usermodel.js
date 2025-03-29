const mongoose = require("mongoose");

//create database
mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

//create document ( a single user )
const userSchema = mongoose.Schema({
  name: String,
  userName: String,
  email: String,
});

// create collection and exports
module.exports = mongoose.model("user", userSchema);
