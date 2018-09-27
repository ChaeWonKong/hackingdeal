const express = require("express");
const path = require("path");
const fs = require("fs");
const detail = require("./client/detail.js");
const index = require("./client/index.js");

const app = express();
app.use(express.static(__dirname + "/client"));

// Base Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "/index.html"));
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

app.listen(4000, () => {
  console.log("Server is running on:4000");
});
