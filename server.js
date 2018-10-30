const express = require("express");
const path = require("path");
const fs = require("fs");
const template = require("./public/template");
const bodyParser = require("body-parser");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");

// Import Routers
const indexRouter = require("./routes/index");
const createRouter = require("./routes/create");

const app = express();

// Import Routers
app.use("/", indexRouter);
app.use("/", createRouter);

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Refactor functions
const getDataAndIndex = (req, data) => {
  const parsedData = JSON.parse(data).deals;
  const targetIndex = _.indexOf(
    parsedData,
    _.find(parsedData, { id: req.params.pageId })
  );
  return { parsedData, targetIndex };
};

// Comment Process
app.post("/comment/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
    if (err) throw err;
    let { parsedData, targetIndex } = getDataAndIndex(req, data);
    let comments = parsedData[targetIndex].comments;
    const body = req.body;
    comments.push({
      id: uuidv1(),
      date: new Date().toLocaleString(),
      nickName: body.nickName,
      content: body.content
    });
    const DATA = JSON.stringify({ deals: parsedData }, null, 3);

    fs.writeFile(path.join(__dirname + "/data/db.json"), DATA, err => {
      if (err) throw err;
      res.redirect(302, `/${req.params.pageId}`);
    });
  });
});

// data page
app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname + "/data/db.json"));
});

// Delete Data page
app.get("/delete", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
    if (err) throw err;
    else {
      const items = JSON.parse(data).deals;
      const html = template.delete(items);
      res.sendFile(path.join(__dirname, "/public"));
      res.send(html);
    }
  });
});

// Delete Data process
app.get("/delete/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
    if (err) throw err;
    let { parsedData, targetIndex } = getDataAndIndex(req, data);
    parsedData.splice(targetIndex, 1);
    const DATA = JSON.stringify({ deals: parsedData }, null, 3);

    fs.writeFile(path.join(__dirname + "/data/db.json"), DATA, err => {
      if (err) throw err;
      res.redirect(302, "/delete");
    });
  });
});

// Update Route

// Detail Route
app.get("/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
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
        res.sendFile(path.join(__dirname, "/public"));
        res.send(html);
      } else {
        res.send("oops");
      }
    }
  });
});

module.exports = app;
