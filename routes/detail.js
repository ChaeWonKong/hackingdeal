const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const template = require("../public/template");
const getDataAndIndex = require("../modules");

// Detail Route
router.get("/:pageId", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../data/db.json"), (err, data) => {
    if (err) throw err;
    else {
      const { parsedData, targetIndex } = getDataAndIndex(req, data);
      const item = parsedData[targetIndex];
      if (item) {
        const html = template.detail(
          item.id,
          item.title,
          item.price,
          item.img,
          item.description,
          item.url,
          item.comments,
          item.relatedItems
        );
        res.sendFile(path.resolve(__dirname, "../public"));
        res.send(html);
      } else {
        res.send("oops");
      }
    }
  });
});

module.exports = router;
