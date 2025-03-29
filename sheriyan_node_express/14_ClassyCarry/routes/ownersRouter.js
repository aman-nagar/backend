const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", (req, res) => {
    ownerModel.create({
      
    })

  });
}

router.get("/", (req, res) => {
  res.send("hey it's working");
});

module.exports = router;
