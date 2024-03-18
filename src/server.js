const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 8000;
const app = express();

http.createServer(app);

const apiDb = require("./api/db.js");

app.use(
  cors({
    origin: "http://localhost",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.type("html");
  res.sendFile(path.resolve(__dirname, "../index.html"));
});

apiDb(app);

app.listen(port, () => {
  console.log("server is connected");
});
