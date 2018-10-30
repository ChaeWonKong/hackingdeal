const express = require("express");
const router = express.Router();
const template = require("../public/template");
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../data/db.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const items = JSON.parse(data).deals;
      const html = template.index(items);
      res.sendFile(path.resolve(__dirname, "../public"));
      res.send(html);
    }
  });
});

module.exports = router;
