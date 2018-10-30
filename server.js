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
const deleteRouter = require("./routes/delete");
const detailRouter = require("./routes/detail");

const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routers
app.use("/", indexRouter);
app.use("/", createRouter);
app.use("/", deleteRouter);
app.use("/", detailRouter);

// data page
app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname + "/data/db.json"));
});

// Update Route

// // Detail Route
// app.get("/:pageId", (req, res) => {
//   fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
//     if (err) throw err;
//     else {
//       const { parsedData, targetIndex } = getDataAndIndex(req, data);
//       const item = parsedData[targetIndex];
//       if (item) {
//         const html = template.detail(
//           item.id,
//           item.title,
//           item.price,
//           item.img,
//           item.description,
//           item.url,
//           item.comments,
//           item.relatedItems
//         );
//         res.sendFile(path.join(__dirname, "/public"));
//         res.send(html);
//       } else {
//         res.send("oops");
//       }
//     }
//   });
// });

module.exports = app;
