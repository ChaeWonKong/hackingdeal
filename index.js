const express = require("express");
const path = require("path");
const fs = require("fs");

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
    res.send(JSON.parse(data).Deals[req.params.pageId - 1]);
  });
});

app.listen(4000, () => {
  console.log("Server is running on:4000");
});
