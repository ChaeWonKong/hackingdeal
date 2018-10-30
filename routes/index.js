// app.get("/", (req, res) => {
//     fs.readFile(path.join(__dirname + "/data/db.json"), (err, data) => {
//       if (err) {
//         throw err;
//       } else {
//         const items = JSON.parse(data).deals;
//         const html = template.index(items);
//         res.sendFile(path.join(__dirname, "/public"));
//         res.send(html);
//       }
//     });
//   });

const router = express.Router();
const template = require("../public/template");

module.exports = router;
