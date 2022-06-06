const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
console.log(__dirname);
console.log(path.join(__dirname, "client/build"));
app.use("/", routes);
app.use(express.static('./images'));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});

