const express = require("express");
const router = express.Router();
const path = require("path");

// data page
router.get("/download", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "../data/db.json"));
  console.log("hello");
  res.redirect(302, "/");
});

module.exports = router;
