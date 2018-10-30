const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const template = require("../public/template");
const getDataAndIndex = require("../modules");

// Delete Data page
router.get("/delete", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../data/db.json"), (err, data) => {
    if (err) throw err;
    else {
      const items = JSON.parse(data).deals;
      const html = template.delete(items);
      res.sendFile(path.resolve(__dirname, "../public"));
      res.send(html);
    }
  });
});

// Delete Data process
router.get("/delete/:pageId", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../data/db.json"), (err, data) => {
    if (err) throw err;
    let { parsedData, targetIndex } = getDataAndIndex(req, data);
    parsedData.splice(targetIndex, 1);
    const DATA = JSON.stringify({ deals: parsedData }, null, 3);

    fs.writeFile(path.resolve(__dirname, "../data/db.json"), DATA, err => {
      if (err) throw err;
      res.redirect(302, "/delete");
    });
  });
});

module.exports = router;
