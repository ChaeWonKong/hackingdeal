const express = require("express");
const path = require("path");
const fs = require("fs");
const detail = require(path.join(__dirname, "/public/detail.js"));
const index = require(path.join(__dirname, "/public/index.js"));
const create = require(path.join(__dirname, "/public/create.js"));
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create Route
app.get("/create", (req, res) => {
  const html = create.HTML();
  res.sendFile(path.join(__dirname, "/public"));
  res.send(html);
});

// Download data
app.get("/download", (req, res) => {
  const html = `<a href="/">Go Hmle</a>`;
  const file = path.join(__dirname + `/data/items.js`);
  res.download(file);
  res.send(html);
});

// Detail Route
app.get("/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/items.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const itemId = String(Number(req.params.pageId) - 1);
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
      }
      res.send("oops");
    }
  });
});

app.post("/create", (req, res) => {
  const body = req.body;
  const data = fs.readFile(
    path.join(__dirname + "/data/items.json"),
    (err, data) => {
      if (err) {
        throw err;
      }
      let DATA = JSON.parse(data).Deals;
      const newData = {
        id: String(DATA.length),
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
        res.redirect(302, "/");
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
