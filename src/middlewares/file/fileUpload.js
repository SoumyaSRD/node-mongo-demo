// middleware/upload.js
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("++++++++++++++++++++++++++");

    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log("____________________________");

    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
