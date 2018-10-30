const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

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

module.exports = app;
