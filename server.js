const express = require("express");
const path = require("path");
const fs = require("fs");
const template = require("./public/template");
const bodyParser = require("body-parser");
const _ = require("lodash");
const csv = require("csvtojson");

// Image Upload
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  })
});

const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create Route
app.get("/new", (req, res) => {
  const html = template.create();
  res.sendFile(path.join(__dirname, "/public"));
  res.send(html);
});

// Image Upload Route
app.get("/uploadimage", (req, res) => {
  const uploadImage = `
  <html>
  <form action="/uploadimage" method="post" enctype="multipart/form-data">
    <input type="file" name="img" />
    <button type="submit">Submit Image</button>
  </form>
  </html>
  `;

  res.send(uploadImage);
});

// Image Upload Process
app.post("/uploadimage", upload.single("img"), (req, res) => {
  state.image = req.file.path;
  res.send(
    `
    <html>
      <body>
        <p>${req.file.path}</p>
        <button onClick="window.close()">Close</button>
      </body>
    </html>`
  );
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
      const items = JSON.parse(data).Deals;
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
    let DATA = JSON.parse(data).Deals;
    const targetIndex = _.indexOf(
      DATA,
      _.find(DATA, { id: req.params.pageId })
    );
    fs.unlink(DATA[targetIndex].img, err => {
      if (err) throw err;
      console.log("Successfully deleted image");
    });
    DATA.splice(targetIndex, 1);
    DATA = JSON.stringify({ Deals: DATA }, null, 3);

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
      const DATA = JSON.parse(data).Deals;
      const targetIndex = _.indexOf(
        DATA,
        _.find(DATA, { id: req.params.pageId })
      );
      const item = DATA[targetIndex];
      if (item) {
        const html = template.detail(
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
    path.join(__dirname + "/data/db.json"),
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

      fs.writeFile(path.join(__dirname + "/data/db.json"), DATA, err => {
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
  fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
    if (err) {
      throw err;
    } else {
      const items = JSON.parse(data).Deals;
      const html = template.index(items);
      res.sendFile(path.join(__dirname, "/public"));
      res.send(html);
    }
  });
  //   const csvFilePath = "./data/db.csv";
  //   csv()
  //     .fromFile(csvFilePath)
  //     .then(jsonObj => {
  //       res.send(jsonObj);
  //     });
});

app.listen(3000, () => console.log("running"));

module.exports = app;
