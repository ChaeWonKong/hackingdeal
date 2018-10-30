const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Import Routers
const indexRouter = require("./routes/index");
const createRouter = require("./routes/create");
const deleteRouter = require("./routes/delete");
const detailRouter = require("./routes/detail");
const downloadRouter = require("./routes/data");

const app = express();

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routers
app.use("/", downloadRouter);
app.use("/", createRouter);
app.use("/", deleteRouter);
app.use("/", detailRouter);
app.use("/", indexRouter);

// Update Route

module.exports = app;
