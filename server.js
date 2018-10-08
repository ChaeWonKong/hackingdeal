const express = require("express");
const path = require("path");
const fs = require("fs");
const detail = require(path.join(__dirname, "/public/detail.js"));
const index = require(path.join(__dirname, "/public/index.js"));
const create = require(path.join(__dirname, "/public/create.js"));
const del = require(path.join(__dirname, "/public/delete.js"));
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create Route
app.get("/new", (req, res) => {
  const html = create.HTML();
  res.sendFile(path.join(__dirname, "/public"));
  res.send(html);
});

// data page
app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname + "/data/items.json"));
});

// Delete Data page
app.get("/delete", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) throw err;
    else {
      const items = JSON.parse(data).Deals;
      const html = del.HTML(items);
      res.sendFile(path.join(__dirname, "/public"));
      res.send(html);
    }
  });
});

// Delete Data process
app.get("/delete/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) throw err;
    let DATA = JSON.parse(data).Deals;
    const targetIndex = _.indexOf(
      DATA,
      _.find(DATA, { id: req.params.pageId })
    );

    DATA.splice(targetIndex, 1);
    DATA = JSON.stringify({ Deals: DATA }, null, 3);

    fs.writeFile(path.join(__dirname + "/data/items.json"), DATA, err => {
      if (err) throw err;
      res.redirect(302, "/delete");
    });
  });
});

// Detail Route
app.get("/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const itemId = req.params.pageId;
      const item = JSON.parse(data).Deals[itemId];
      if (item) {
        const html = detail.HTML(
          item.title,
          item.price,
          item.img,
          item.description,
          item.url
        );
        res.sendFile(path.join(__dirname, "/public"));
        res.send(html);
      } else {
        res.send("oops");
      }
    }
  });
});

// Create Process
app.post("/create", (req, res) => {
  const body = req.body;
  const data = fs.readFile(
    path.join(__dirname + "/data/items.json"),
    (err, data) => {
      if (err) {
        throw err;
      }
      let DATA = JSON.parse(data).Deals;
      const latestItem = DATA.length - 1;
      const newData = {
        id: String(Number(DATA[latestItem].id) + 1),
        title: body.title,
        price: body.price,
        img: body.img,
        description: body.description,
        url: body.url
      };
      DATA.push(newData);
      DATA = JSON.stringify({ Deals: DATA }, null, 3);

      fs.writeFile(path.join(__dirname + "/data/items.json"), DATA, err => {
        if (err) {
          throw err;
        }
        res.redirect(302, "/new");
      });
    }
  );
});

// Base Route
app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const items = JSON.parse(data).Deals;
      const html = index.HTML(items);
      res.sendFile(path.join(__dirname, "/public"));
      res.send(html);
    }
  });
});

app.listen(3000, () => console.log("running"));

module.exports = app;
