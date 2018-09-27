const express = require("express");
const path = require("path");
const fs = require("fs");
const detail = require(path.join(__dirname, "/client/detail.js"));
const index = require(path.join(__dirname, "/client/index.js"));
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, "/client")));

// Base Route
app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const items = JSON.parse(data).Deals;
      const html = index.HTML(items);
      res.sendFile(path.join(__dirname, "client"));
      res.send(html);
    }
  });
});

// Detail Route
app.get("/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) {
      throw err;
    }
    // res.send(JSON.parse(data).Deals[req.params.pageId - 1]);
    else {
      const item = JSON.parse(data).Deals[req.params.pageId - 1];
      const { title, price, img, description, url } = item;
      const html = detail.HTML({ title, price, img, description, url });
      res.sendFile(path.join(__dirname, "client"));
      res.send(html);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on:${PORT}}`);
});
