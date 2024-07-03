// 12_mini_project/config/multerconfig.js
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// diskstorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/uploads"); // file destination should be relative
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, buf) => {
      if (err) {
        return cb(err);
      }
      const filename = buf.toString("hex") + path.extname(file.originalname); // file extentions
      cb(null, filename);
    });
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
