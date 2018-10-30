const express = require("express");
const router = express.Router();
const path = require("path");

// data page
router.get("/data", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../data/db.json"));
});

module.exports = router;
