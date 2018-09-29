const express = require("express");
const path = require("path");
const fs = require("fs");
const detail = require(path.join(__dirname, "/client/detail.js"));
const index = require(path.join(__dirname, "/client/index.js"));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/client")));

// Detail Route
app.get("/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const itemId = String(Number(req.params.pageId) - 1);
      const item = JSON.parse(data).Deals[itemId];
      const html = detail.HTML(
        item.title,
        item.price,
        item.img,
        item.description,
        item.url
      );
      res.sendFile(path.join(__dirname, "/client"));
      res.send(html);
    }
  });
});

// Base Route
app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const items = JSON.parse(data).Deals;
      const html = index.HTML(items);
      res.sendFile(path.join(__dirname, "/client"));
      res.send(html);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}}`);
});
