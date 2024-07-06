// 14_ClassyCarry/models/user-model.js

const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
  products: {
    type: Array,
    default: [],
  },

  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);
