// 14_ClassyCarry/config/mongoose-connection.js

const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/classycarry`)
  .then(() => {
    dbgr("connected");
  })
  .catch((err) => {
    dbgr(err);
  });

module.exports = mongoose.connect;
