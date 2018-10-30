const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const template = require("../public/template");
const uuidv1 = require("uuid/v1");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const getDataAndIndex = require("../server/modules");

// Image Upload with AWS
AWS.config.loadFromPath(path.resolve(__dirname, "../config/awsconfig.json"));
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

// // Image Upload with local folder
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, "uploads/");
//     },
//     filename: function(req, file, cb) {
//       cb(null, new Date().valueOf() + path.extname(file.originalname));
//     }
//   })
// });

// Create Route
router.get("/new", (req, res) => {
  const html = template.create();
  res.sendFile(path.resolve(__dirname, "../public"));
  res.send(html);
});

// Create Process
router.post(
  "/create",
  upload.fields([{ name: "uploaded" }, { name: "relatedImg" }]),
  (req, res) => {
    const body = req.body;
    fs.readFile(path.resolve(__dirname, "../data/db.json"), (err, data) => {
      if (err) throw err;
      let parsedData = JSON.parse(data).deals;
      const image = req.files.uploaded
        ? "https://s3.ap-northeast-2.amazonaws.com/hackingdeal/" +
          req.files.uploaded[0].filename
        : body.img;
      const relatedImgs = req.files.relatedImg;
      let relatedItems = [];
      if (relatedImgs) {
        for (let i = 0; i < relatedImgs.length; i++) {
          const item = {
            id: uuidv1(),
            title: body.relatedTitle[i],
            price: body.relatedPrice[i],
            url: body.relatedLink[i],
            img:
              "https://s3.ap-northeast-2.amazonaws.com/hackingdeal/" +
              relatedImgs[i].filename
          };
          relatedItems.push(item);
        }
      }
      const newData = {
        id: uuidv1(),
        title: body.title,
        price: body.price,
        img: image,
        description: body.description,
        url: body.url,
        comments: [],
        relatedItems
      };
      parsedData.push(newData);
      const DATA = JSON.stringify({ deals: parsedData }, null, 3);

      fs.writeFile(path.resolve(__dirname, "../data/db.json"), DATA, err => {
        if (err) throw err;
        res.redirect(302, "/");
      });
    });
  }
);

// Comment Process
router.post("/comment/:pageId", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../data/db.json"), (err, data) => {
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

    fs.writeFile(path.resolve(__dirname, "../data/db.json"), DATA, err => {
      if (err) throw err;
      res.redirect(302, `/${req.params.pageId}`);
    });
  });
});

module.exports = router;
