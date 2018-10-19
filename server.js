const express = require("express");
const path = require("path");
const fs = require("fs");
const template = require("./public/template");
const bodyParser = require("body-parser");
const _ = require("lodash");

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// Image Upload
AWS.config.loadFromPath(__dirname + "/config/awsconfig.json");
const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "hackingdeal",
    key: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
    acl: "public-read-write"
  })
});

const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create Route
app.get("/new", (req, res) => {
  const html = template.create();
  res.sendFile(path.join(__dirname, "/public"));
  res.send(html);
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
    let parsedData = JSON.parse(data).deals;
    const targetIndex = _.indexOf(
      parsedData,
      _.find(parsedData, { id: req.params.pageId })
    );
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
      const DATA = JSON.parse(data).deals;
      const targetIndex = _.indexOf(
        DATA,
        _.find(DATA, { id: req.params.pageId })
      );
      const item = DATA[targetIndex];
      if (item) {
        const html = template.detail(
          item.id,
          item.title,
          item.price,
          item.img,
          item.description,
          item.url,
          item.comments
        );
        res.sendFile(path.join(__dirname, "/public"));
        res.send(html);
      } else {
        res.send("oops");
      }
    }
  });
});

// Comment Process
app.post("/comment/:pageId", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
    if (err) throw err;

    let parsedData = JSON.parse(data);
    let targetIndex = _.indexOf(
      parsedData.deals,
      _.find(parsedData.deals, { id: req.params.pageId })
    );
    let comments = parsedData.deals[targetIndex].comments;
    const newId = comments.length;
    const body = req.body;
    comments.push({
      id: newId,
      nickName: body.nickName,
      content: body.content
    });
    const DATA = JSON.stringify(parsedData, null, 3);

    fs.writeFile(path.join(__dirname + "/data/db.json"), DATA, err => {
      if (err) throw err;
      res.redirect(302, `/${req.params.pageId}`);
    });
  });
});

// Create Process
app.post("/create", upload.single("uploaded"), (req, res) => {
  const body = req.body;
  fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
    if (err) throw err;
    let parsedData = JSON.parse(data).deals;
    const latestItem = parsedData.length - 1;
    const image = req.file.key
      ? "https://s3.ap-northeast-2.amazonaws.com/hackingdeal/" + req.file.key
      : body.img;
    const newData = {
      id: String(Number(parsedData[latestItem].id) + 1),
      title: body.title,
      price: body.price,
      img: image,
      description: body.description,
      url: body.url,
      comments: []
    };
    parsedData.push(newData);
    const DATA = JSON.stringify({ deals: parsedData }, null, 3);

    fs.writeFile(path.join(__dirname + "/data/db.json"), DATA, err => {
      if (err) throw err;
      res.redirect(302, "/");
    });
  });
});

// Base Route
app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const items = JSON.parse(data).deals;
      const html = template.index(items);
      res.sendFile(path.join(__dirname, "/public"));
      res.send(html);
    }
  });
});

app.listen(3000, () => console.log("running"));

module.exports = app;
